import { ReactElement, useState } from 'react';
import SEO from '@/components/atom/SEO';
import PageTemplate from '@/components/templates/PageTemplate';
import Button from '@/components/atom/Button';
import Link from 'next/link';
import {
  Content,
  Smile,
  Title,
  Subtitle,
} from '@/styles/pages/checkout/[patientId]/WaitingApproval';
import RateModal from '@/components/organisms/RateModal';

export default function WaitingApproval(): ReactElement {
  const [displayRateModal, setDisplayRateModal] = useState(false);

  return (
    <PageTemplate
      buttonType={{
        type: 'go_back_button',
      }}
    >
      <SEO
        title="Aguardando confirmação de pagamento"
        description="Obrigado! Recebemos seu pedido de agendamento de exames médicos e agora estamos aguardando a aprovação do seu pagamento. Você receberá um e-mail com informando sobre a aprovação."
      />
      <Content>
        <Smile>:)</Smile>
        <Title>Estamos aguardando a aprovação do seu pagamento</Title>
        <Subtitle>
          Este processo costuma demorar apenas alguns minutos. Fique de olho no
          seu e-mail que notificaremos quando seu pagamento for aprovado.
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
