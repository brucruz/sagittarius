import PageTemplate from '@/components/templates/PageTemplate';
import TitleMain from '@/components/molecule/TitleMain';
import { Smile, Title, Subtitle, Content } from '@/styles/pages/ThankYou';
import ButtonNext from '@/components/atom/ButtonNext';

export default function ThankYou() {
  return (
    <PageTemplate backLinkUrl={''}>
      <Content>
        <Smile>;D</Smile>
        <Title>
          Tudo certo com sua<br />
          Solicitação de Agendamento!
        </Title>
        <Subtitle>Em instantes você receberá as orientações <br />em seu E-mail e WhatsApp.</Subtitle>
        <ButtonNext text="Continuar navegando" />
      </Content>
    </PageTemplate>
  );
}