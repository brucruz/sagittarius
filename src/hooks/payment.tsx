import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react';
import { IFormPayment } from '@/@types/Payment';
import PricesInBag from '@/@types/PricesInBag';
import User from '@/@types/User';
import { useRouter } from 'next/router';
import { differenceInBusinessDays, format, add, parse } from 'date-fns';
import pagarme from 'pagarme';
import Api from '@/services/api';
import mixpanel from 'mixpanel-browser';
import CardApiResponse from '@/@types/CardFromApi';
import { useToast } from '@/hooks/toast';
import errors from '@/contents/pages/PaymentError/errors';

interface BillOfExchangeRules {
  boleto_expiration_date: string;
  boleto_instructions: string;
  boleto_rules: string[];
}

interface BillOfExchangeInfo {
  boleto_url?: string;
  boleto_barcode?: string;
}

interface PaymentContextData {
  userCards: CardApiResponse[];
  changeUserCards: (value: CardApiResponse[]) => void;
  selectedCard: CardApiResponse;
  changeSelectedCard: (value: CardApiResponse) => void;
  paymentData: IFormPayment;
  changePaymentData: (value: IFormPayment) => void;
  handlePaymentWithCreditCard: (bagItems: PricesInBag[], user: User) => void;
  handleBillOfExchange: (
    preferredDateTo: string,
    bagItems: PricesInBag[],
    user: User,
  ) => void;
  billOfExchangeInfo: BillOfExchangeInfo;
  setBillOfExchangeInfo: (value: BillOfExchangeInfo) => void;
}

const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData,
);

const PaymentProvider = ({ children }): ReactElement => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<IFormPayment>({});
  const [
    billOfExchangeInfo,
    setBillOfExchangeInfo,
  ] = useState<BillOfExchangeInfo>({});
  const [userCards, setUserCards] = useState<CardApiResponse[]>(
    [] as CardApiResponse[],
  );
  const [selectedCard, setSelectedCard] = useState<CardApiResponse>(
    {} as CardApiResponse,
  );

  const { addToast } = useToast();

  const handleToastMessage = useCallback(
    (status: string, error = '0') => {
      if (['paid', 'authorized'].includes(status)) {
        addToast({
          type: 'success',
          title: 'Tudo certo com a sua solicitação de agendamento.',
        });
      } else if (status === 'processing') {
        addToast({
          type: 'info',
          title: 'Estamos processando seu pagamento.',
        });
      } else if (status === 'waiting_payment') {
        addToast({
          type: 'info',
          title: 'Estamos aguardando o pagamento do seu boleto.',
        });
      } else if (status === 'refused') {
        const errorKeyFound = Object.keys(errors).filter(key =>
          errors[key].codes.includes(error),
        )[0];

        addToast({
          type: 'error',
          title: errors[errorKeyFound]?.text,
        });
      }
    },
    [addToast],
  );

  const changePaymentData = useCallback((data: IFormPayment) => {
    setPaymentData(data);
  }, []);

  const changeSelectedCard = useCallback((data: CardApiResponse) => {
    setSelectedCard(data);
  }, []);

  const changeUserCards = useCallback((data: CardApiResponse[]) => {
    setUserCards(data);
  }, []);

  function handleBillOfExchange(
    preferredDateTo: string,
    bagItems: PricesInBag[],
    user: User,
  ): void {
    const billOfExchangeRules = {
      boleto_rules: ['strict_expiration_date'],
      boleto_instructions:
        'Favor não aceitar após a data de vencimento deste boleto',
    } as BillOfExchangeRules;

    const currentDate = new Date(); // MM-dd-yyyy
    const userFinalDate = parse(preferredDateTo, 'dd/MM/yyyy', new Date());

    const dateDiffInDays = differenceInBusinessDays(userFinalDate, currentDate);

    if (dateDiffInDays <= 4) {
      billOfExchangeRules.boleto_expiration_date = format(
        currentDate,
        'yyyy-MM-dd',
      );
    } else if (dateDiffInDays < 10) {
      const daysToAdd = dateDiffInDays - 3;

      billOfExchangeRules.boleto_expiration_date = format(
        add(currentDate, { days: daysToAdd }),
        'yyyy-MM-dd',
      );
    } else {
      billOfExchangeRules.boleto_expiration_date = format(
        add(currentDate, { days: 7 }),
        'yyyy-MM-dd',
      );
    }

    const items = [];

    bagItems.forEach(item => {
      item.price.forEach(price => {
        items.push({
          id: price.exam_id,
          title: price.exam.title,
          unit_price: price.price,
          quantity: 1,
          tangible: false,
        });
      });
    });

    const quoteObject = JSON.parse(sessionStorage.getItem('@Heali:quote'));
    const bagId = sessionStorage.getItem('@Heali:bagId');

    pagarme.client
      .connect({ api_key: process.env.NEXT_PUBLIC_PAGARME_API_KEY })
      .then(client =>
        client.transactions.create({
          ...billOfExchangeRules,
          amount: paymentData.amount,
          async: false,
          payment_method: paymentData.payment_method,
          postback_url: `${process.env.NEXT_PUBLIC_API_URL}/payments/postback`,
          customer: {
            external_id: user.id,
            name: paymentData.full_name,
            email: paymentData.email,
            country: 'br',
            type: 'individual',
            documents: [
              {
                type: 'cpf',
                number: paymentData.document.document_number,
              },
            ],
            phone_numbers: [
              `${
                paymentData.tel.includes('+55')
                  ? paymentData.tel
                  : `+55${paymentData.tel}`
              }`,
            ],
          },
          billing: {
            name: paymentData.full_name,
            address: {
              street: paymentData.address.street,
              street_number: paymentData.address.street_number,
              zipcode: paymentData.address.cep,
              country: 'br',
              state: paymentData.address.state,
              city: paymentData.address.city,
            },
          },
          items,
          metadata: {
            bagId,
            quoteId: quoteObject.id,
          },
        }),
      )
      .then(transaction => {
        user && mixpanel.identify(user.id);
        mixpanel.track('Payment Trial', {
          Value: paymentData.amount,
          'Exams Count': items.length,
          'Payment Method': 'bill of exchange',
          Installments: paymentData.installments && paymentData.installments,
          'Payment Response Status': transaction.status,
          // 'Payer': string, // self ou other
        });

        const url = window.location.pathname.split('pagamento')[0];
        const token = localStorage.getItem('@Heali:token');

        Api.post(
          '/payments',
          {
            bagId,
            quoteId: quoteObject.id,
            payment: transaction,
          },
          {
            headers: {
              Authorization: `Bearer: ${token}`,
            },
          },
        )
          .then(() => {
            if (
              transaction.status === 'waiting_payment' ||
              transaction.status === 'processing'
            ) {
              handleToastMessage(transaction.status);
              setBillOfExchangeInfo({
                boleto_url: transaction.boleto_url,
                boleto_barcode: transaction.boleto_barcode,
              });
              router.replace(`${url}aguardando-pagamento-boleto`);
            } else if (transaction.status === 'refused') {
              handleToastMessage(transaction.acquirer_response_code);
              router.replace({
                pathname: `${url}erro-no-pagamento`,
                query: {
                  status_erro: transaction.acquirer_response_code,
                },
              });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  function handlePaymentWithCreditCard(
    bagItems: PricesInBag[],
    user: User,
  ): void {
    const items = [];

    bagItems.forEach(item => {
      item.price.forEach(price => {
        items.push({
          id: price.exam_id,
          title: price.exam.title,
          unit_price: price.price,
          quantity: 1,
          tangible: false,
        });
      });
    });

    const bagId = sessionStorage.getItem('@Heali:bagId');
    const quoteObject = JSON.parse(sessionStorage.getItem('@Heali:quote'));

    pagarme.client
      .connect({ api_key: process.env.NEXT_PUBLIC_PAGARME_API_KEY })
      .then(client =>
        client.transactions.create({
          amount: paymentData.amount,
          card_id: paymentData.card?.card_id,
          card_number: paymentData.card?.card_number,
          card_cvv: paymentData.card?.card_cvv,
          card_expiration_date:
            !paymentData.card.card_id &&
            `${paymentData.card?.card_expiration_month}${paymentData.card?.card_expiration_year[2]}${paymentData.card?.card_expiration_year[3]}`,
          card_holder_name: paymentData.card?.card_holder_name,
          payment_method: paymentData.payment_method,
          async: false,
          postback_url: `${process.env.NEXT_PUBLIC_API_URL}/payments/postback`,
          customer: {
            external_id: user.id,
            name: paymentData.full_name,
            email: paymentData.email,
            country: 'br',
            type: 'individual',
            documents: [
              {
                type: 'cpf',
                number: paymentData.document.document_number.replace(
                  /[.*/-]/gm,
                  '',
                ),
              },
            ],
            phone_numbers: [
              `${
                paymentData.tel.includes('+55')
                  ? paymentData.tel
                  : `+55${paymentData.tel}`
              }`,
            ],
          },
          billing: {
            name: paymentData.full_name,
            address: {
              street: paymentData.address.street,
              street_number: paymentData.address.street_number,
              zipcode: paymentData.address.cep,
              country: 'br',
              state: paymentData.address.state,
              city: paymentData.address.city,
            },
          },
          installments: paymentData.installments
            ? paymentData.installments.split('x')[0]
            : 1,
          items,
          metadata: {
            bagId,
            quoteId: quoteObject.id,
          },
        }),
      )
      .then(transaction => {
        const url = window.location.pathname.split('pagamento')[0];
        const token = localStorage.getItem('@Heali:token');

        user && mixpanel.identify(user.id);
        mixpanel.track('Payment Trial', {
          Value: paymentData.amount,
          'Exams Count': items.length,
          'Payment Method': 'credit card',
          Installments: paymentData.installments && paymentData.installments,
          'Payment Response Status': transaction.status,
          // 'Payer': string, // self ou other
        });

        Api.post(
          '/payments',
          {
            payment: transaction,
            bagId,
            quoteId: quoteObject.id,
          },
          {
            headers: {
              Authorization: `Bearer: ${token}`,
            },
          },
        )
          .then(() => {
            if (['paid', 'authorized'].includes(transaction.status)) {
              handleToastMessage(transaction.status);
              router.replace(`${url}obrigado`);
            } else if (transaction.status === 'processing') {
              handleToastMessage(transaction.status);
              router.replace(`${url}aguardando-aprovacao`);
            } else if (transaction.status === 'refused') {
              handleToastMessage(
                transaction.status,
                transaction.acquirer_response_code,
              );
              router.replace({
                pathname: `${url}erro-no-pagamento`,
                query: {
                  status_erro: transaction.acquirer_response_code,
                },
              });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  return (
    <PaymentContext.Provider
      value={{
        selectedCard,
        userCards,
        paymentData,
        billOfExchangeInfo,
        changePaymentData,
        changeSelectedCard,
        changeUserCards,
        handlePaymentWithCreditCard,
        handleBillOfExchange,
        setBillOfExchangeInfo,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

function usePayment(): PaymentContextData {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error('useBag must be used within a PaymentProvider');
  }

  return context;
}

export { PaymentProvider, usePayment };
