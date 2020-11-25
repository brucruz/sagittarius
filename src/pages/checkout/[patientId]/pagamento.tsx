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
import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';

interface IFormPayment {
  payment_method?: 'credit_card' | 'boleto';
}

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
  const [form, setForm] = useState<IFormPayment>({});
  const { user } = useAuth();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Pagamento',
    });
  }, [user]);

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
              label="Nome completo"
            />
            <div className="docs-div">
              <RadioButton name="radio-document" label="CPF" />
              <RadioButton name="radio-document" label="RG" />
              <RadioButton name="radio-document" label="RNE" />
            </div>
            <Input
              className="input-payment"
              name="input-user-document"
              label="Documento"
            />
            <Input
              className="input-payment"
              name="input-user-email"
              label="E-mail"
            />
            <Input
              className="input-payment last-element"
              name="input-user-telefone"
              label="Telefone"
            />
          </>
        )}
        {currentStep === 1 && (
          <>
            <Input className="input-payment" name="input-cep" label="CEP" />
            <Input className="input-payment" name="input-street" label="Rua" />
            <div className="double-input-div">
              <Input
                className="input-payment"
                name="input-house-number"
                label="Numero"
              />
              <Input
                className="input-payment"
                name="input-house-complement"
                label="Complemento"
              />
            </div>
            <Input
              className="input-payment"
              name="input-neighborhood"
              label="Bairro"
            />
            <Input className="input-payment" name="input-city" label="Cidade" />
            <div className="double-input-div last-element">
              <Input className="input-payment" name="input-state" label="UF" />
              <Input
                className="input-payment"
                name="input-country"
                label="País"
              />
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <PaymentMethodSelector
              className={
                form.payment_method === CREDIT_CARD ? 'selected' : 'notChecked'
              }
            >
              <RadioButton
                name="payment-method"
                label="Cartão de Crédito"
                onChange={() =>
                  setForm({ ...form, payment_method: CREDIT_CARD })
                }
              />
              {form.payment_method === CREDIT_CARD && <CreditCardForm />}
            </PaymentMethodSelector>
            <PaymentMethodSelector
              className={
                form.payment_method === BILL_OF_EXCHANGE
                  ? 'bill-selected'
                  : 'notChecked'
              }
            >
              <RadioButton
                name="payment-method"
                label="Boleto"
                description="A comprovação pode demorar até 3 dias."
                onChange={() =>
                  setForm({ ...form, payment_method: BILL_OF_EXCHANGE })
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
        <Button onClick={handleCurrentStep}>Continuar</Button>
      )}
    </PageTemplate>
  );
}
