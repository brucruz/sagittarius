import { useCallback, useEffect, useState } from 'react';
import PageTemplate from '@/components/templates/PageTemplate';
import {
  Smile,
  Title,
  Subtitle,
  Content,
  ModalContainer,
} from '@/styles/pages/checkout/[patientId]/ThankYou';
import Button from '@/components/atom/Button';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import Modal from '@/components/organisms/Modal';

import starUnfilled from '@/assets/pages/ThankYou/star-unfilled.svg';
import starFilled from '@/assets/pages/ThankYou/star-filled.svg';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';

interface star {
  id: number;
  isFilled: boolean;
}

export default function ThankYou() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Thank Yoy Page',
    });
  }, [user]);

  const [rateStars, setRateStart] = useState<star[]>([
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

  const [userRate, setUserRate] = useState(0);
  const [displayRateModal, setDisplayRateModal] = useState(false);

  function handleChangeStar(starId: number) {
    const starIndex = rateStars.findIndex(star => star.id === starId);

    setRateStart(
      rateStars.map((star, index) =>
        index <= starIndex
          ? {
              id: star.id,
              isFilled: true,
            }
          : {
              id: star.id,
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
  }, [user, router]);

  return (
    <PageTemplate
      buttonType={{
        type: 'go_back_button',
      }}
    >
      <Content>
        <Smile>;D</Smile>
        <Title>
          Tudo certo com sua
          <br />
          Solicitação de Agendamento!
        </Title>
        <Subtitle>
          Em instantes você receberá as orientações <br />
          em seu E-mail e WhatsApp.
        </Subtitle>
        <Button onClick={() => setDisplayRateModal(true)}>
          Avaliar experiência
        </Button>
        <Link href="/">
          <a>Ir para o início</a>
        </Link>
      </Content>
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
              minuto para responder algumas perguntas curtinhas que vão nos
              ajudar a entender como estamos indo.
            </p>
            <h3>
              Qual a probabilidade de você recomendar os serviços da Heali
              alguém da sua família ou amigo?
            </h3>
            <div className="stars-div">
              {rateStars.map((star: star) => {
                return (
                  <div key={star.id}>
                    <img
                      onClick={() => {
                        setUserRate(star.id);
                        handleChangeStar(star.id);
                      }}
                      src={star.isFilled ? starFilled : starUnfilled}
                      alt="Ícone de estrela"
                    />
                    {star.id}
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
    </PageTemplate>
  );
}
