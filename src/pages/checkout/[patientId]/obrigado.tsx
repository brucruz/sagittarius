import { ReactElement, useEffect, useState } from 'react';
import PageTemplate from '@/components/templates/PageTemplate';
import {
  Smile,
  Title,
  Subtitle,
  Content,
} from '@/styles/pages/checkout/[patientId]/ThankYou';
import Button from '@/components/atom/Button';
import Link from 'next/link';

import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';
import SEO from '@/components/atom/SEO';
import RateModal from '@/components/organisms/RateModal';

export default function ThankYou(): ReactElement {
  const { user } = useAuth();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Thank Yoy Page',
    });
  }, [user]);

  const [displayRateModal, setDisplayRateModal] = useState(false);

  return (
    <PageTemplate>
      <SEO
        title="Pedido de agendamento concluído"
        description="Obrigado! Recebemos seu pedido de agendamento de exames médicos e em breve um atendente entrará em contato contigo."
      />

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
      <RateModal
        displayRateModal={displayRateModal}
        setDisplayRateModal={setDisplayRateModal}
      />
    </PageTemplate>
  );
}
