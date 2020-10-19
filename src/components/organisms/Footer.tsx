import Link from 'next/link';

import { Container, FooterHeader, SocialButtons, FooterDivisionLine, FooterFooter } from '@/styles/components/organisms/Footer';

import instagram from '@/assets/components/organisms/Footer/instagram.svg';
import facebook from '@/assets/components/organisms/Footer/facebook.svg';

const Footer = () => {
  return (
    <Container>
      <FooterHeader>
        <h4>Nos siga nas redes sociais</h4>

        <SocialButtons>
          <Link href="https://www.facebook.com/heali.br">
            <img src={facebook} alt="facebook"/>
          </Link>

          <Link href="https://www.instagram.com/heali.br">
            <img src={instagram} alt="instagram"/>
          </Link>
        </SocialButtons>
      </FooterHeader>

      <FooterDivisionLine />

      <FooterFooter>
        <p>
        2020 - © Copyright Heali.me<br />
        CNPJ: 35.087.847/0001-30
        </p>
      </FooterFooter>
    </Container>
  )
}

export default Footer;
