import PageTemplate from '@/components/templates/PageTemplate';
import { ReactElement, useCallback, useState, useEffect } from 'react';
import { PageHeaderProps } from '@/components/molecule/PageHeader';
import Checkbox from '@/components/atom/Checkbox';
import Input from '@/components/atom/Input';
import RadioButton from '@/components/atom/RadioButton';
import Button from '@/components/atom/Button';
import CreditCardForm from '@/components/organisms/CreditCardForm';
import {
  PaymentMethodSelector,
  Container,
} from '@/styles/pages/checkout/[patientId]/Payment';
import { CREDIT_CARD, BILL_OF_EXCHANGE } from '@/constants/payment';
import { usePayment } from '@/hooks/payment';
import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';

interface IPageTemplateState extends PageHeaderProps {
  titleMain: {
    title: string;
    subTitle: string;
  };
}

const pageTemplateState: IPageTemplateState[] = [
  {
    buttonType: {
      type: 'change_state_button',
      stepper: '1/3',
    },
    titleMain: {
      title: 'Quais são os dados do pagador?',
      subTitle:
        'Estes dados são necessários para obtermos aprovação do pagamento',
    },
  },
  {
    buttonType: {
      type: 'change_state_button',
      stepper: '2/3',
    },
    titleMain: {
      title: 'Qual o endereço de cobrança?',
      subTitle:
        'Estes dados são necessários para obtermos aprovação do pagamento',
    },
  },
  {
    buttonType: {
      type: 'change_state_button',
      stepper: '3/3',
    },
    titleMain: {
      title: 'Como prefere pagar?',
      subTitle: 'Selecione a forma de pagamento',
    },
  },
];

export default function Payment(): ReactElement {
  const [currentStep, setCurrentStep] = useState(0);
  const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(
    false,
  );

  const { paymentData, setPaymentData } = usePayment();
  const { user } = useAuth();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Payment Page',
    });
  }, [user]);

  useEffect(() => {
    if (currentStep === 0) {
      if (
        !paymentData.full_name ||
        !paymentData.document ||
        !paymentData.tel ||
        !paymentData.email
      ) {
        setIsContinueButtonDisabled(true);
      } else {
        setIsContinueButtonDisabled(false);
      }
    } else if (currentStep === 1) {
      if (
        !paymentData.address?.cep ||
        !paymentData.address?.city ||
        !paymentData.address?.neighborhood ||
        !paymentData.address?.state ||
        !paymentData.address?.street ||
        !paymentData.address?.street_number
      ) {
        setIsContinueButtonDisabled(true);
      } else {
        setIsContinueButtonDisabled(false);
      }
    }
  }, [
    currentStep,
    paymentData.address,
    paymentData.full_name,
    paymentData.document,
    paymentData.tel,
    paymentData.email,
  ]);

  function handleCurrentStep(): void {
    switch (currentStep) {
      case 0: {
        setCurrentStep(1);
        break;
      }

      case 1: {
        setCurrentStep(2);
        break;
      }

      default:
        break;
    }
  }

  const handleBackButton = useCallback(
    state => {
      setCurrentStep(state);
    },
    [setCurrentStep],
  );

  return (
    <PageTemplate
      buttonType={{
        ...pageTemplateState[currentStep].buttonType,
        type: 'change_state_button',
        backButtonNewState: currentStep - 1,
        backButtonStateCallback: handleBackButton,
      }}
      titleMain={pageTemplateState[currentStep].titleMain}
    >
      <Container>
        {currentStep === 0 && (
          <>
            <Checkbox
              label="Utilizar meus dados de usuário para o pagamento"
              id="checkbox-payment"
            />
            <Input
              className="input-payment"
              name="input-user-name"
              value={paymentData.full_name}
              onChange={event =>
                setPaymentData({
                  ...paymentData,
                  full_name: event.target.value,
                })
              }
              label="Nome completo"
            />
            <Input
              className="input-payment"
              name="input-user-document"
              label="CPF"
              value={paymentData.document?.document_number}
              onChange={event =>
                setPaymentData({
                  ...paymentData,
                  document: {
                    ...paymentData.document,
                    document_number: event.target.value,
                  },
                })
              }
            />
            <Input
              className="input-payment"
              name="input-user-email"
              label="E-mail"
              value={paymentData.email}
              onChange={event =>
                setPaymentData({
                  ...paymentData,
                  email: event.target.value,
                })
              }
            />
            <Input
              className="input-payment last-element"
              name="input-user-telefone"
              label="Telefone"
              value={paymentData.tel}
              onChange={event =>
                setPaymentData({
                  ...paymentData,
                  tel: event.target.value,
                })
              }
            />
          </>
        )}
        {currentStep === 1 && (
          <>
            <Input
              className="input-payment"
              name="input-cep"
              label="CEP"
              value={paymentData.address?.cep}
              onChange={event =>
                setPaymentData({
                  ...paymentData,
                  address: {
                    ...paymentData.address,
                    cep: event.target.value,
                  },
                })
              }
            />
            <Input
              className="input-payment"
              name="input-street"
              label="Rua"
              value={paymentData.address?.street}
              onChange={event =>
                setPaymentData({
                  ...paymentData,
                  address: {
                    ...paymentData.address,
                    street: event.target.value,
                  },
                })
              }
            />
            <div className="double-input-div">
              <Input
                className="input-payment"
                name="input-house-number"
                label="Numero"
                value={paymentData.address?.street_number}
                onChange={event =>
                  setPaymentData({
                    ...paymentData,
                    address: {
                      ...paymentData.address,
                      street_number: event.target.value,
                    },
                  })
                }
              />
              <Input
                className="input-payment"
                name="input-house-complement"
                label="Complemento"
                value={paymentData.address?.complement}
                onChange={event =>
                  setPaymentData({
                    ...paymentData,
                    address: {
                      ...paymentData.address,
                      complement: event.target.value,
                    },
                  })
                }
              />
            </div>
            <Input
              className="input-payment"
              name="input-neighborhood"
              label="Bairro"
              value={paymentData.address?.neighborhood}
              onChange={event =>
                setPaymentData({
                  ...paymentData,
                  address: {
                    ...paymentData.address,
                    neighborhood: event.target.value,
                  },
                })
              }
            />
            <Input
              className="input-payment"
              name="input-city"
              label="Cidade"
              value={paymentData.address?.city}
              onChange={event =>
                setPaymentData({
                  ...paymentData,
                  address: {
                    ...paymentData.address,
                    city: event.target.value,
                  },
                })
              }
            />
            <Input
              className="input-payment last-element"
              name="input-state"
              label="UF"
              value={paymentData.address?.state}
              onChange={event =>
                setPaymentData({
                  ...paymentData,
                  address: {
                    ...paymentData.address,
                    state: event.target.value,
                  },
                })
              }
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <PaymentMethodSelector
              className={
                paymentData.payment_method === CREDIT_CARD
                  ? 'selected'
                  : 'notChecked'
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
              {paymentData.payment_method === CREDIT_CARD && <CreditCardForm />}
            </PaymentMethodSelector>
            <PaymentMethodSelector
              className={
                paymentData.payment_method === BILL_OF_EXCHANGE
                  ? 'bill-selected'
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
        )}
      </Container>
      {currentStep !== 2 && (
        <Button disabled={isContinueButtonDisabled} onClick={handleCurrentStep}>
          Continuar
        </Button>
      )}
    </PageTemplate>
  );
}
