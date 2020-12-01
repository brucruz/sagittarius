import { createContext, ReactElement, useContext, useState } from 'react';
import pagarme from 'pagarme';
import Api from '@/services/api';
import { useRouter } from 'next/router';
import { IFormPayment } from '@/@types/Payment';
import PricesInBag from '@/@types/PricesInBag';
import User from '@/@types/User';

interface PaymentContextData {
  paymentData: IFormPayment;
  setPaymentData: (value: IFormPayment) => void;
  handlePaymentWithCreditCard: (bagItems: PricesInBag[], user: User) => void;
}

const PaymentContext = createContext<PaymentContextData>(
  {} as PaymentContextData,
);

const PaymentProvider = ({ children }): ReactElement => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<IFormPayment>({});

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

    pagarme.client
      .connect({ api_key: process.env.NEXT_PUBLIC_PAGARME_API_KEY })
      .then(client =>
        client.transactions.create({
          amount: paymentData.amount * 100,
          card_number: paymentData.card.card_number,
          card_cvv: paymentData.card.card_cvv,
          card_expiration_date: `${paymentData.card.card_expiration_month}${paymentData.card.card_expiration_year[2]}${paymentData.card.card_expiration_year[3]}`,
          card_holder_name: paymentData.card.card_holder_name,
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
          installments: paymentData.installments
            ? paymentData.installments.split('x')[0]
            : 1,
          items,
        }),
      )
      .then(transaction => {
        const url = window.location.pathname.split('pagamento')[0];
        const token = localStorage.getItem('@Heali:token');

        const bagId = sessionStorage.getItem('@Heali:bagId');
        const quoteObject = JSON.parse(sessionStorage.getItem('@Heali:quote'));

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
        ).then(() => {
          if (['paid', 'authorized'].includes(transaction.status)) {
            router.replace(`${url}obrigado`);
          } else if (transaction.status === 'processing') {
            router.replace(`${url}aguardando-aprovacao`);
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
        handlePaymentWithCreditCard,
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
