import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';
import { ReactElement } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Container } from '../../styles/components/atom/WhatsappWidget';

export default function WhatsappWidget(): ReactElement {
  const { user } = useAuth();

  user && mixpanel.identify(user.id);
  mixpanel.track_links('#Whatsapp_Help_Button', 'Help - Whatsapp Button Click');

  return (
    <Container>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://api.whatsapp.com/send?phone=5511936186364"
        id="Whatsapp_Help_Button"
      >
        <FaWhatsapp />
        <h4>Precisa de ajuda?</h4>
      </a>
    </Container>
  );
}
