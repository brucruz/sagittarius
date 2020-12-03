import { ReactElement } from 'react';
import RadioButton from '@/components/atom/RadioButton';
import { usePayment } from '@/hooks/payment';
import Button from '@/components/atom/Button';
import { CREDIT_CARD, BILL_OF_EXCHANGE } from '@/constants/payment';
import {
  PaymentMethodSelector,
  BillOfExchangeContainer,
} from '@/styles/components/organisms/PaymentSelector';
import CreditCardForm from '@/components/organisms/CreditCardForm';

interface PaymentSelectorProps {
  handleCurrentStep?: () => void;
}

const PaymentSelector = ({
  handleCurrentStep,
}: PaymentSelectorProps): ReactElement => {
  const { paymentData, setPaymentData } = usePayment();

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
          onChange={() =>
            setPaymentData({
              ...paymentData,
              payment_method: CREDIT_CARD,
            })
          }
        />
        {paymentData.payment_method === CREDIT_CARD && (
          <CreditCardForm handleCurrentStep={handleCurrentStep} />
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
          onChange={() =>
            setPaymentData({
              ...paymentData,
              payment_method: BILL_OF_EXCHANGE,
            })
          }
        />
        {paymentData.payment_method === BILL_OF_EXCHANGE && (
          <BillOfExchangeContainer>
            <Button
              onClick={() => {
                handleCurrentStep();
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
