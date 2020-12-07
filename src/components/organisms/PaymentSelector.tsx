import { ReactElement, useEffect, useState } from 'react';
import RadioButton from '@/components/atom/RadioButton';
import { usePayment } from '@/hooks/payment';
import Button from '@/components/atom/Button';
import { CREDIT_CARD, BILL_OF_EXCHANGE } from '@/constants/payment';
import {
  PaymentMethodSelector,
  BillOfExchangeContainer,
} from '@/styles/components/organisms/PaymentSelector';
import CreditCardForm from '@/components/organisms/CreditCardForm';
import Api from '@/services/api';
import CardApiResponse from '@/@types/CardFromApi';
import { useAuth } from '@/hooks/auth';
import { useBag } from '@/hooks/bag';
import { QuoteResponse } from '@/pages/checkout/[patientId]/confirmar';
import axios from 'axios';

interface PaymentSelectorProps {
  handleCurrentStep?: () => void;
}

const PaymentSelector = ({
  handleCurrentStep,
}: PaymentSelectorProps): ReactElement => {
  const [quote, setQuote] = useState<QuoteResponse>({} as QuoteResponse);
  const {
    userCards,
    paymentData,
    selectedCard,
    changePaymentData,
    changeUserCards,
    changeSelectedCard,
    handleBillOfExchange,
  } = usePayment();

  const [selectedCardOnModal, changeSelectedCardOnModal] = useState('');
  const { user } = useAuth();
  const { bagItems } = useBag();

  useEffect(() => {
    setQuote(JSON.parse(sessionStorage.getItem('@Heali:quote')));
  }, []);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const fetchData = async (): Promise<void> => {
      if (userCards.length === 0 && !paymentData.verifyCard) {
        const token = localStorage.getItem('@Heali:token') || '';

        try {
          Promise.resolve(
            Api.get<CardApiResponse[]>('/cards', {
              cancelToken: source.token,
              headers: {
                Authorization: `Bearer: ${token}`,
              },
            }),
          )
            .then(({ data }) => {
              if (data.length === 0) return;

              const mainCard = data.filter(card => card.isMain && card)[0];

              changeUserCards(data);
              changeSelectedCard(mainCard);
              changeSelectedCardOnModal(mainCard.id);
            })
            .catch(err => console.log(err));
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('cancelled');
          } else {
            throw error;
          }
        }
      }
    };

    if (paymentData.verifyCard) {
      changeUserCards([]);
      changeSelectedCard({} as CardApiResponse);
    }

    fetchData();

    return () => {
      source.cancel();
    };
  }, [
    paymentData.verifyCard,
    changeSelectedCard,
    changeUserCards,
    userCards.length,
  ]);

  return (
    <>
      <PaymentMethodSelector
        className={
          paymentData.payment_method === CREDIT_CARD ? 'selected' : 'notChecked'
        }
      >
        <RadioButton
          name="payment-method"
          label="Cartão de Crédito"
          isChecked={paymentData.payment_method === CREDIT_CARD}
          onChange={() => {
            const creditCardMain =
              userCards?.filter(card => card.isMain && card)[0] ||
              ({} as CardApiResponse);

            changeSelectedCard(creditCardMain);
            changeSelectedCardOnModal(creditCardMain.id);
            if (creditCardMain.id) {
              changePaymentData({
                ...paymentData,
                payment_method: CREDIT_CARD,
                full_name: creditCardMain.paying_customer.name,
                document: {
                  type: creditCardMain.paying_customer.documents[0].type,
                  document_number:
                    creditCardMain.paying_customer.documents[0].number,
                },
                email: creditCardMain.paying_customer.email,
                tel: creditCardMain.paying_customer.phone_numbers[0],
                address: {
                  ...creditCardMain.billing_address.address,
                  cep: creditCardMain.billing_address.address.zipcode,
                },
                card: {
                  card_id: creditCardMain.foreign_id,
                },
              });
            } else {
              changePaymentData({
                ...paymentData,
                payment_method: CREDIT_CARD,
              });
            }
          }}
        />
        {paymentData.payment_method === CREDIT_CARD && (
          <CreditCardForm
            handleCurrentStep={handleCurrentStep}
            selectedCardOnModal={selectedCardOnModal}
            changeSelectedCardOnModal={changeSelectedCardOnModal}
          />
        )}
      </PaymentMethodSelector>
      <PaymentMethodSelector
        className={
          paymentData.payment_method === BILL_OF_EXCHANGE
            ? 'selected'
            : 'notChecked'
        }
      >
        <RadioButton
          name="payment-method"
          label="Boleto"
          isChecked={paymentData.payment_method === BILL_OF_EXCHANGE}
          description="A comprovação pode demorar até 3 dias."
          onChange={() => {
            const billData =
              userCards?.filter(
                card => card.payment_method === BILL_OF_EXCHANGE && card,
              )[0] || ({} as CardApiResponse);

            changeSelectedCard(billData);

            if (billData.id) {
              changePaymentData({
                ...paymentData,
                payment_method: BILL_OF_EXCHANGE,
                full_name: billData.paying_customer.name,
                document: {
                  type: billData.paying_customer.documents[0].type,
                  document_number: billData.paying_customer.documents[0].number,
                },
                email: billData.paying_customer.email,
                tel: billData.paying_customer.phone_numbers[0],
                address: {
                  ...billData.billing_address.address,
                  cep: billData.billing_address.address.zipcode,
                },
              });
            } else {
              changePaymentData({
                ...paymentData,
                payment_method: BILL_OF_EXCHANGE,
              });
            }
          }}
        />
        {paymentData.payment_method === BILL_OF_EXCHANGE && (
          <BillOfExchangeContainer>
            <Button
              onClick={() => {
                if (selectedCard.foreign_id) {
                  handleBillOfExchange(quote.dates.to, bagItems, user);
                } else {
                  changePaymentData({
                    payment_method: BILL_OF_EXCHANGE,
                  });
                  handleCurrentStep();
                }
              }}
            >
              Pagar com Boleto Bancário
            </Button>
          </BillOfExchangeContainer>
        )}
      </PaymentMethodSelector>
      <PaymentMethodSelector className="disabled">
        <RadioButton name="payment-method" label="PicPay" disabled />
        <span>Em Breve</span>
      </PaymentMethodSelector>
      <PaymentMethodSelector className="disabled">
        <RadioButton name="payment-method" label="Pix" disabled />
        <span>Em Breve</span>
      </PaymentMethodSelector>
    </>
  );
};

export default PaymentSelector;
