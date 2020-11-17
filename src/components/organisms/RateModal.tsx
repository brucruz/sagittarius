/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ReactElement, useState, useCallback } from 'react';
import Modal from '@/components/organisms/Modal';
import { ModalContainer } from '@/styles/components/organisms/RateModal';
import { MdClose } from 'react-icons/md';
import mixpanel from 'mixpanel-browser';
import { useAuth } from '@/hooks/auth';
import Button from '@/components/atom/Button';
import starUnfilled from '@/assets/pages/ThankYou/star-unfilled.svg';
import starFilled from '@/assets/pages/ThankYou/star-filled.svg';

interface RateModalProps {
  displayRateModal: boolean;
  setDisplayRateModal: (args: boolean) => void;
}

interface star {
  id: number;
  isFilled: boolean;
}

const RateModal = ({
  displayRateModal,
  setDisplayRateModal,
}: RateModalProps): ReactElement => {
  const { user } = useAuth();
  const [userRate, setUserRate] = useState(0);
  const [rateStars, setRateStar] = useState<star[]>([
    {
      id: 1,
      isFilled: false,
    },
    {
      id: 2,
      isFilled: false,
    },
    {
      id: 3,
      isFilled: false,
    },
    {
      id: 4,
      isFilled: false,
    },
    {
      id: 5,
      isFilled: false,
    },
    {
      id: 6,
      isFilled: false,
    },
    {
      id: 7,
      isFilled: false,
    },
    {
      id: 8,
      isFilled: false,
    },
    {
      id: 9,
      isFilled: false,
    },
    {
      id: 10,
      isFilled: false,
    },
  ]);

  function handleChangeStar(starId: number): void {
    const starIndex = rateStars.findIndex(rateStar => rateStar.id === starId);

    setRateStar(
      rateStars.map((rateStar, index) =>
        index <= starIndex
          ? {
              id: rateStar.id,
              isFilled: true,
            }
          : {
              id: rateStar.id,
              isFilled: false,
            },
      ),
    );
  }

  const handleTrackStarSubmit = useCallback(() => {
    user && mixpanel.identify(user.id);

    mixpanel.register({
      'Last NPS Rating': userRate,
    });

    mixpanel.track_links('#nps-redirect', 'NPS - Research Button Click');
  }, [user, userRate]);

  return (
    <Modal
      isOpen={displayRateModal}
      setIsOpen={() => setDisplayRateModal(false)}
    >
      <ModalContainer>
        <div>
          <MdClose onClick={() => setDisplayRateModal(false)} />
        </div>
        <div>
          <h2>O que está achando da Heali?</h2>
          <p>
            Nós valorizamos sua opinião e esperamos que você possa dedicar um
            minuto para responder algumas perguntas curtinhas que vão nos ajudar
            a entender como estamos indo.
          </p>
          <h3>
            Qual a probabilidade de você recomendar os serviços da Heali alguém
            da sua família ou amigo?
          </h3>
          <div className="stars-div">
            {rateStars.map((rateStar: star) => {
              return (
                <div key={rateStar.id}>
                  <img
                    onClick={() => {
                      setUserRate(rateStar.id);
                      handleChangeStar(rateStar.id);
                    }}
                    src={rateStar.isFilled ? starFilled : starUnfilled}
                    alt="Ícone de estrela"
                  />
                  {rateStar.id}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Button type="button">
            <a
              href={`https://airtable.com/shrGy6kCQJwvozf2T?prefill_Name=${user?.first_name}%20${user?.last_name}&prefill_Email=${user?.email}&prefill_NPS Score=${userRate}`}
              target="blank"
              id="nps-redirect"
              onClick={handleTrackStarSubmit}
            >
              Enviar avaliação
            </a>
          </Button>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default RateModal;
