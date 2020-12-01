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
  BillOfExchangeContainer,
} from '@/styles/pages/checkout/[patientId]/Payment';
import { CREDIT_CARD, BILL_OF_EXCHANGE } from '@/constants/payment';
import { usePayment } from '@/hooks/payment';
import { useAuth } from '@/hooks/auth';
import axios, { AxiosResponse } from 'axios';
import mixpanel from 'mixpanel-browser';
import { useBag } from '@/hooks/bag';

interface IPageTemplateState extends PageHeaderProps {
  titleMain: {
    title: string;
    subTitle: string;
  };
}

interface DisabledInputs {
  neighborhood?: boolean;
  street?: boolean;
  city?: boolean;
  state?: boolean;
}

interface CepResponse {
  neighborhood?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
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
  const [disabledInputs, setDisabledInputs] = useState<DisabledInputs>(
    {} as DisabledInputs,
  );
  const [useUserData, setUseUserData] = useState(false);
  const { bagItems } = useBag();

  const {
    paymentData,
    setPaymentData,
    handlePaymentWithCreditCard,
  } = usePayment();
  const { user } = useAuth();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Payment Page',
    });
  }, [user]);

  useEffect(() => {
    if (currentStep === 1) {
      if (
        !paymentData.full_name ||
        !paymentData.document?.document_number ||
        !paymentData.tel ||
        !paymentData.email
      ) {
        setIsContinueButtonDisabled(true);
      } else {
        setIsContinueButtonDisabled(false);
      }
    } else if (currentStep === 2) {
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
                  <Button>Pagar com Boleto Bancário</Button>
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
        )}
        {currentStep === 1 && (
          <>
            <Checkbox
              label="Utilizar meus dados de usuário para o pagamento"
              id="checkbox-payment"
              onChange={() => {
                if (!useUserData) {
                  setPaymentData({
                    ...paymentData,
                    full_name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    tel: user.phone_whatsapp && user.phone_whatsapp,
                  });
                } else {
                  setPaymentData({
                    ...paymentData,
                    full_name: '',
                    email: '',
                    tel: '',
                  });
                }

                setUseUserData(!useUserData);
              }}
              isChecked={useUserData}
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
        {currentStep === 2 && (
          <>
            <Input
              className="input-payment"
              name="input-cep"
              label="CEP"
              mask="99999999"
              onBlur={() => {
                const cep = paymentData.address?.cep;
                if (cep.length === 8) {
                  axios
                    .get(
                      `https://api.pagar.me/1/zipcodes/${cep}?api-key=${process.env.NEXT_PUBLIC_PAGARME_API_KEY}`,
                    )
                    .then((res: AxiosResponse<CepResponse>) => {
                      const { data } = res;
                      setPaymentData({
                        ...paymentData,
                        address: {
                          ...paymentData.address,
                          street: data.street
                            ? data.street
                            : paymentData.address?.street,
                          neighborhood: data.neighborhood
                            ? data.neighborhood
                            : paymentData.address?.neighborhood,
                          city: data.city
                            ? data.city
                            : paymentData.address?.city,
                          state: data.state
                            ? data.state
                            : paymentData.address?.state,
                        },
                      });

                      setDisabledInputs({
                        ...disabledInputs,
                        street: !!data.street,
                        neighborhood: !!data.neighborhood,
                        city: !!data.city,
                        state: !!data.state,
                      });
                    });
                } else {
                  setPaymentData({
                    ...paymentData,
                    address: {
                      ...paymentData.address,
                      street: '',
                      neighborhood: '',
                      city: '',
                      state: '',
                    },
                  });

                  setDisabledInputs({
                    ...disabledInputs,
                    street: false,
                    neighborhood: false,
                    city: false,
                    state: false,
                  });
                }
              }}
              value={paymentData.address?.cep}
              onChange={event => {
                const cep = event.target.value.replace(/_*/gm, '');

                setPaymentData({
                  ...paymentData,
                  address: {
                    ...paymentData.address,
                    cep,
                  },
                });
              }}
            />
            <Input
              className="input-payment"
              name="input-street"
              disabled={disabledInputs.street}
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
              disabled={disabledInputs.neighborhood}
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
              disabled={disabledInputs.city}
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
              disabled={disabledInputs.state}
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
      </Container>
      {currentStep !== 0 && (
        <Button
          disabled={isContinueButtonDisabled}
          onClick={() =>
            currentStep === 1
              ? handleCurrentStep()
              : handlePaymentWithCreditCard(bagItems, user)
          }
        >
          {currentStep === 1 ? 'Continuar' : 'Finalizar pagamento'}
        </Button>
      )}
    </PageTemplate>
  );
}
