import { ReactElement, useState } from 'react';
import SEO from '@/components/atom/SEO';
import PageTemplate from '@/components/templates/PageTemplate';
import Input from '@/components/atom/Input';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '@/components/atom/Button';
import Link from 'next/link';
import {
  Content,
  ExperienceButton,
} from '@/styles/pages/checkout/[patientId]/WaitingBillToBePayed';
import RateModal from '@/components/organisms/RateModal';

export default function WaitingPayment(): ReactElement {
  const [displayRateModal, setDisplayRateModal] = useState(false);

  return (
    <PageTemplate
      titleMain={{
        title: 'Estamos aguardando a confirmação de pagamento do boleto',
        subTitle:
          'Após a compensação, entraremos em contato para confirmar o agendamento',
      }}
      buttonType={{
        type: 'go_back_button',
      }}
    >
      <SEO
        title="Aguardando confirmação de pagamento"
        description="Obrigado! Recebemos seu pedido de agendamento de exames médicos e agora estamos aguardando a aprovação do seu pagamento. Você receberá um e-mail com informando sobre a aprovação."
      />

      <Content>
        <CopyToClipboard text="0000">
          <Input
            label="Seu código de barras"
            value="0000"
            name="bill-of-exchange-code-input"
            hasCopyButton
          />
        </CopyToClipboard>

        <Link href="https://www.google.com" passHref>
          <a target="_blank">
            <Button>Visualizar Boleto</Button>
          </a>
        </Link>

        <ExperienceButton onClick={() => setDisplayRateModal(true)}>
          Avaliar experiência
        </ExperienceButton>

        <RateModal
          displayRateModal={displayRateModal}
          setDisplayRateModal={setDisplayRateModal}
        />
      </Content>
    </PageTemplate>
  );
}
