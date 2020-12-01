import { createContext, ReactElement, useContext, useState } from 'react';
import { IFormPayment } from '@/@types/Payment';
import { useRouter } from 'next/router';
import moment from 'moment';
import pagarme from 'pagarme';
import Api from '@/services/api';
import PricesInBag from '@/@types/PricesInBag';
import User from '@/@types/User';

interface BillOfExchangeRules {
  boleto_expiration_date: string;
  boleto_instructions: string;
  boleto_rules: string[];
}

interface PaymentContextData {
  paymentData: IFormPayment;
  setPaymentData: (value: IFormPayment) => void;
  handleBillOfExchange: (
    preferredDateTo: Date,
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
    preferredDateTo: Date,
    bagItems: PricesInBag[],
    user: User,
  ): void {
    const billOfExchangeRules = {
      boleto_rules: ['strict_expiration_date'],
      boleto_instructions:
        'Favor não aceitar após a data de vencimento deste boleto',
    } as BillOfExchangeRules;

    const currentDate = moment().hour(12).minute(0).second(0);
    const userFinalDate = moment(preferredDateTo);

    const dateDiffInDays = userFinalDate.diff(currentDate, 'days');

    if (dateDiffInDays <= 4) {
      billOfExchangeRules.boleto_expiration_date = currentDate.format(
        'YYYY-MM-DD',
      );
    } else if (dateDiffInDays < 10) {
      const currentDay = currentDate.get('date');
      const daysToAdd = currentDay + dateDiffInDays - 3 - currentDay;

      billOfExchangeRules.boleto_expiration_date = currentDate
        .add(daysToAdd, 'day')
        .format('YYYY-MM-DD');
    } else {
      billOfExchangeRules.boleto_expiration_date = currentDate
        .add(7, 'day')
        .format('YYYY-MM-DD');
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
