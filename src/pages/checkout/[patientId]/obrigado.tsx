import PageTemplate from '@/components/templates/PageTemplate';
import { Smile, Title, Subtitle, Content } from '@/styles/pages/checkout/[patientId]/ThankYou';
import ButtonNext from '@/components/atom/ButtonNext';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <PageTemplate
      buttonType={{
        type: 'go_back_button',
      }}
    >
      <Content>
        <Smile>;D</Smile>
        <Title>
          Tudo certo com sua<br />
          Solicitação de Agendamento!
        </Title>
        <Subtitle>Em instantes você receberá as orientações <br />em seu E-mail e WhatsApp.</Subtitle>
        <Link href="/">
          <ButtonNext text="Continuar navegando" />
        </Link>
      </Content>
    </PageTemplate>
  );
}
