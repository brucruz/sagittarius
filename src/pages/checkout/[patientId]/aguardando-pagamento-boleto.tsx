import { ReactElement, useState } from 'react';
import SEO from '@/components/atom/SEO';
import PageTemplate from '@/components/templates/PageTemplate';
import CopyToClipboard from 'react-copy-to-clipboard';
import Button from '@/components/atom/Button';
import Link from 'next/link';
import {
  Content,
  ExperienceButton,
  CopyContent,
} from '@/styles/pages/checkout/[patientId]/WaitingBillToBePayed';
import RateModal from '@/components/organisms/RateModal';
import { IoIosCopy } from 'react-icons/io';

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
        <CopyToClipboard text="34191.09016 54318.440671 03922.160001 9 84620000280951">
          <CopyContent>
            <div className="text">
              <label>Seu código de barras</label>
              <span>
                34191.09016 54318.440671 03922.160001 9 84620000280951
              </span>
            </div>
            <IoIosCopy />
          </CopyContent>
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
