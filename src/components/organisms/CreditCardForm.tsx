import { ReactElement, useState, useEffect } from 'react';
import {
  Container,
  MainCard,
  CardContent,
  ModalContainer,
  CardContainer,
  CloseDiv,
} from '@/styles/components/organisms/CreditCardForm';
import Dropdown from '@/components/atom/Dropdown';
import Api from '@/services/api';
import { AxiosResponse } from 'axios';
import diners from '@/assets/components/atoms/Input/diners-club.svg';
import amex from '@/assets/components/atoms/Input/american-express.svg';
import visa from '@/assets/components/atoms/Input/visa.svg';
import generic from '@/assets/components/atoms/Input/generic.svg';
import discover from '@/assets/components/atoms/Input/discover.svg';
import mastercard from '@/assets/components/atoms/Input/mastercard.svg';
import { useAuth } from '@/hooks/auth';
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

interface CardApiResponse {
  id: string;
  user_id: string;
  payment_method: string;
  object: string;
  foreign_id: string;
  isMain: boolean;
  foreign_date_created: string;
  foreign_date_updated: string;
  brand: string;
  holder_name: string;
  first_digits: string;
  last_digits: string;
  country: string;
  fingerprint: string;
  valid: boolean;
  billing_address: {
    object: string;
    id: number;
    name: string;
    address: {
      object: string;
      street: string;
      complementary: string;
      street_number: string;
      neighborhood: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
    };
  };
  paying_customer: {
    object: string;
    id: number;
    external_id: string;
    type: string;
    country: string;
    document_number: string;
    document_type: string;
    name: string;
    email: string;
    phone_numbers: string[];
    born_at: string;
    birthday: string;
    gender: string;
    date_created: string;
    documents: [
      {
        object: string;
        id: string;
        type: 'cpf';
        number: string;
      },
    ];
  };
  expiration_date: string;
}

const creditCardBrands = {
  amex,
  visa,
  discover,
  generic,
  mastercard,
  diners,
};

const CreditCardForm = ({
  handleCurrentStep,
}: CreditCardFormProps): ReactElement => {
  const [userCards, setUserCards] = useState<CardApiResponse[]>(
    [] as CardApiResponse[],
  );
  const [selectedCard, setSelectedCard] = useState<CardApiResponse>(
    {} as CardApiResponse,
  );
  const [isPaymentButtonDisabled, setIsPaymentButtonDisabled] = useState(true);
  const [displayChangeCreditCard, setDisplayChangeCreditCard] = useState(false);
  const [displayAddNewCard, setDisplayAddNewCard] = useState(false);
  const [selectedCardOnModal, setSelectedCardOnModal] = useState('');
  const {
    paymentData,
    setPaymentData,
    handlePaymentWithCreditCard,
  } = usePayment();
  const { bagTotalPrice, bagItems } = useBag();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCards = async (): Promise<void> => {
      const token = localStorage.getItem('@Heali:token') || '';

      const cards: AxiosResponse<CardApiResponse[]> = await Api.get('/cards', {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });

      if (cards.data.length === 0) return;

      const mainCard = cards.data.filter(card => card.isMain && card)[0];

      setUserCards(cards.data);
      setSelectedCard(mainCard);
      setSelectedCardOnModal(mainCard.id);

      setPaymentData({
        ...paymentData,
        full_name: mainCard.paying_customer.name,
        document: {
          type: mainCard.paying_customer.documents[0].type,
          document_number: mainCard.paying_customer.documents[0].number,
        },
        email: mainCard.paying_customer.email,
        tel: mainCard.paying_customer.phone_numbers[0],
        address: {
          ...mainCard.billing_address.address,
          cep: mainCard.billing_address.address.zipcode,
        },
        card: {
          card_id: mainCard.foreign_id,
        },
      });
    };

    if (userCards.length === 0 && !paymentData.verifyCard) {
      fetchCards();
    }

    if (paymentData.verifyCard) {
      setUserCards([]);
      setSelectedCard({} as CardApiResponse);
    }
  }, [paymentData, setPaymentData, userCards.length]);

  useEffect(() => {
    if (
      (paymentData.card?.card_holder_name &&
        paymentData.card?.card_number &&
        paymentData.card?.card_cvv &&
        paymentData.card?.card_expiration_month &&
        paymentData.card?.card_expiration_year &&
        paymentData.installments) ||
      (paymentData.card?.card_id && paymentData.installments)
    ) {
      setIsPaymentButtonDisabled(false);
    } else {
      setIsPaymentButtonDisabled(true);
    }
  }, [paymentData.installments, paymentData.card, setPaymentData]);

  const installments = Array.from(Array(12), (_, index) => ({
    id: index,
    value: `${index + 1}x de R$${formatValueWo$(bagTotalPrice / (index + 1))}`,
    label: `${index + 1}x de R$${formatValueWo$(bagTotalPrice / (index + 1))}`,
  }));

  function handlePaymentClick(): void {
    if (paymentData.card.card_id) {
      handlePaymentWithCreditCard(bagItems, user);
    } else {
      handleCurrentStep();
    }
  }

  return (
    <Container className="credit-card-form">
      {userCards.length > 0 ? (
        <>
          <MainCard>
            <img
              src={creditCardBrands[selectedCard.brand]}
              alt="Ícone da marca do cartão de crédito"
            />
            <div>
              <span>
                {selectedCard.brand?.toUpperCase()} *{selectedCard.last_digits}
              </span>
              <caption>{selectedCard.holder_name}</caption>
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
              <MdClose
                onClick={() => {
                  delete paymentData.card?.card_number;
                  delete paymentData.card?.card_holder_name;
                  delete paymentData.card?.card_expiration_year;
                  delete paymentData.card?.card_expiration_month;
                  delete paymentData.card?.card_cvv;
                  setDisplayAddNewCard(false);
                  setDisplayChangeCreditCard(false);
                }}
              />
            </CloseDiv>
            <ModalContainer>
              {displayAddNewCard ? (
                <>
                  <h3>Adicionar cartão de crédito</h3>
                  <div className="container-credit-card-fields">
                    <CreditCardFields isModal />
                    <Button
                      onClick={() => {
                        setPaymentData({
                          amount: paymentData.amount,
                          card: {
                            card_number: paymentData.card.card_number,
                            card_holder_name: paymentData.card.card_holder_name,
                            card_expiration_month:
                              paymentData.card.card_expiration_month,
                            card_expiration_year:
                              paymentData.card.card_expiration_year,
                            card_cvv: paymentData.card.card_cvv,
                          },
                        });
                        handleCurrentStep();
                        setDisplayChangeCreditCard(false);
                      }}
                    >
                      Adicionar cartão de crédito
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h3>Com qual cartão você prefere pagar?</h3>
                  <CardContainer>
                    {userCards.map(card => (
                      <CardContent
                        key={card.id}
                        onClick={() => setSelectedCardOnModal(card.id)}
                      >
                        <img
                          src={creditCardBrands[card.brand]}
                          alt="Ícone da marca do cartão de crédito"
                        />
                        <div>
                          <span>
                            {`${card.first_digits?.substring(
                              0,
                              4,
                            )} ${card.first_digits?.substring(
                              4,
                              card.first_digits?.length,
                            )}`}
                            XX XXXX {card.last_digits}
                          </span>
                        </div>
                        {card.id === selectedCardOnModal && (
                          <FiCheck className="check-icon" />
                        )}
                      </CardContent>
                    ))}
                  </CardContainer>
                  <button
                    type="button"
                    className="add-new-credit-card"
                    onClick={() => setDisplayAddNewCard(true)}
                  >
                    Adicionar cartão de crédito
                  </button>

                  <Button
                    onClick={() => {
                      const cardSelectedByUser = userCards.filter(
                        card => card.id === selectedCardOnModal && card,
                      )[0];

                      setSelectedCard(cardSelectedByUser);
                      setPaymentData({
                        ...paymentData,
                        card: {
                          ...paymentData.card,
                          card_id: cardSelectedByUser.foreign_id,
                        },
                      });
                      setDisplayChangeCreditCard(false);
                    }}
                  >
                    Selecionar cartão de crédito
                  </Button>
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
