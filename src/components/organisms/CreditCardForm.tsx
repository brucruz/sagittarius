import { ReactElement, useState, useEffect } from 'react';
import {
  Container,
  MainCard,
  Card,
  ModalContainer,
  CardContainer,
  CloseDiv,
} from '@/styles/components/organisms/CreditCardForm';
import Dropdown from '@/components/atom/Dropdown';
import visa from '@/assets/components/atoms/Input/visa.svg';
import discover from '@/assets/components/atoms/Input/discover.svg';
import mastercard from '@/assets/components/atoms/Input/mastercard.svg';
import { usePayment } from '@/hooks/payment';
import { useBag } from '@/hooks/bag';
import Modal from '@/components/organisms/Modal';
import { FiCheck } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import CreditCardFields from '@/components/molecule/CreditCardFields';
import formatValueWo$ from '@/utils/formatValueWo$';
import Button from '../atom/Button';

interface CreditCardFormProps {
  handleCurrentStep?: () => void;
}

const CreditCardForm = ({
  handleCurrentStep,
}: CreditCardFormProps): ReactElement => {
  const [isPaymentButtonDisabled, setIsPaymentButtonDisabled] = useState(true);
  const [displayChangeCreditCard, setDisplayChangeCreditCard] = useState(false);
  const [displayAddNewCard, setDisplayAddNewCard] = useState(false);
  const { paymentData, setPaymentData } = usePayment();
  const { bagTotalPrice } = useBag();

  const alreadyHasCreditCard = false;

  useEffect(() => {
    if (
      !paymentData.card?.card_holder_name ||
      !paymentData.card?.card_number ||
      !paymentData.card?.card_cvv ||
      !paymentData.card?.card_expiration_month ||
      !paymentData.card?.card_expiration_year ||
      !paymentData.installments
    ) {
      setIsPaymentButtonDisabled(true);
    } else {
      setIsPaymentButtonDisabled(false);
    }
  }, [paymentData.installments, paymentData.card, setPaymentData]);

  if (!paymentData.amount) {
    setPaymentData({
      ...paymentData,
      amount: bagTotalPrice,
    });
  }

  const installments = Array.from(Array(12), (_, index) => ({
    id: index,
    value: `${index + 1}x de R$${formatValueWo$(bagTotalPrice / (index + 1))}`,
    label: `${index + 1}x de R$${formatValueWo$(bagTotalPrice / (index + 1))}`,
  }));

  function handlePaymentClick(): void {
    handleCurrentStep();
  }

  return (
    <Container className="credit-card-form">
      {alreadyHasCreditCard ? (
        <>
          <MainCard>
            <img src={mastercard} alt="Ícone da marca do cartão de crédito" />
            <div>
              <span>MASTERCARD *1234</span>
              <caption>Bruno Gomes da Cruz</caption>
            </div>
            <button
              type="button"
              onClick={() => setDisplayChangeCreditCard(true)}
            >
              Trocar
            </button>
          </MainCard>
          <Modal
            isOpen={displayChangeCreditCard}
            setIsOpen={() => setDisplayChangeCreditCard(false)}
          >
            <CloseDiv>
              <MdClose onClick={() => setDisplayChangeCreditCard(false)} />
            </CloseDiv>
            <ModalContainer>
              {displayAddNewCard ? (
                <>
                  <h3>Adicionar cartão de crédito</h3>
                  <div className="container-credit-card-fields">
                    <CreditCardFields isModal />
                    <Button>Adicionar cartão de crédito</Button>
                  </div>
                </>
              ) : (
                <>
                  <h3>Com qual cartão você prefere pagar?</h3>
                  <CardContainer>
                    <Card>
                      <img
                        src={mastercard}
                        alt="Ícone da marca do cartão de crédito"
                      />
                      <div>
                        <span>9876 54XX XXXX 1234</span>
                      </div>
                      <FiCheck className="check-icon" />
                    </Card>
                    <Card>
                      <img
                        src={discover}
                        alt="Ícone da marca do cartão de crédito"
                      />
                      <div>
                        <span>9876 54XX XXXX 1234</span>
                      </div>
                    </Card>
                    <Card>
                      <img
                        src={visa}
                        alt="Ícone da marca do cartão de crédito"
                      />
                      <div>
                        <span>9876 54XX XXXX 1234</span>
                      </div>
                    </Card>
                  </CardContainer>
                  <button
                    type="button"
                    className="add-new-credit-card"
                    onClick={() => setDisplayAddNewCard(true)}
                  >
                    Adicionar cartão de crédito
                  </button>

                  <Button>Selecionar cartão de crédito</Button>
                </>
              )}
            </ModalContainer>
          </Modal>
        </>
      ) : (
        <CreditCardFields />
      )}
      <div className="installments-container">
        <Dropdown
          defaultValue="Parcelar em"
          options={installments}
          value={paymentData.installments}
          setValue={value =>
            setPaymentData({
              ...paymentData,
              installments: value,
            })
          }
        />
      </div>
      <Button disabled={isPaymentButtonDisabled} onClick={handlePaymentClick}>
        Pagar com Cartão de Crédito
      </Button>
    </Container>
  );
};

export default CreditCardForm;
