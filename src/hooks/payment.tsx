import { createContext, ReactElement, useContext, useState } from 'react';
import { IFormPayment } from '@/@types/Payment';
import { useRouter } from 'next/router';
import moment from 'moment';
import { differenceInBusinessDays, format, getDate, add } from 'date-fns';
import pagarme from 'pagarme';
import Api from '@/services/api';
import PricesInBag from '@/@types/PricesInBag';
import User from '@/@types/User';
import mixpanel from 'mixpanel-browser';

interface BillOfExchangeRules {
  boleto_expiration_date: string;
  boleto_instructions: string;
  boleto_rules: string[];
}

interface PaymentContextData {
  paymentData: IFormPayment;
  setPaymentData: (value: IFormPayment) => void;
  handleBillOfExchange: (
    preferredDateTo: string,
    bagItems: PricesInBag[],
    user: User,
  ) => void;
}

const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData,
);

const PaymentProvider = ({ children }): ReactElement => {
  const [paymentData, setPaymentData] = useState<IFormPayment>({});
  const router = useRouter();

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

    const dateSplited = preferredDateTo.split('/');
    const currentDate = new Date();
    const userFinalDate = new Date(
      `${dateSplited[1]}/${dateSplited[0]}/${dateSplited[2]}`,
    );

    const dateDiffInDays = differenceInBusinessDays(userFinalDate, currentDate);

    if (dateDiffInDays <= 4) {
      billOfExchangeRules.boleto_expiration_date = format(
        currentDate,
        'yyyy-MM-dd',
      );
    } else if (dateDiffInDays < 10) {
      const currentDay = getDate(currentDate);
      const daysToAdd = currentDay + dateDiffInDays - 3 - currentDay;

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

    pagarme.client
      .connect({ api_key: process.env.NEXT_PUBLIC_PAGARME_API_KEY })
      .then(client =>
        client.transactions.create({
          ...billOfExchangeRules,
          amount: paymentData.amount,
          payment_method: paymentData.payment_method,
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
            phone_numbers: [`+55${paymentData.tel}`],
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

        const quoteObject = JSON.parse(sessionStorage.getItem('@Heali:quote'));
        const bagId = sessionStorage.getItem('@Heali:bagId');
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
        ).then(() => {
          if (transaction.status === 'waiting_payment') {
            router.replace(`${url}aguardando-pagamento-boleto`);
          } else if (transaction.status === 'refused') {
            router.replace({
              pathname: `${url}erro-no-pagamento`,
              query: {
                status_erro: transaction.acquirer_response_code,
              },
            });
          }
        });
      });
  }

  return (
    <PaymentContext.Provider
      value={{
        paymentData,
        setPaymentData,
        handleBillOfExchange,
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
