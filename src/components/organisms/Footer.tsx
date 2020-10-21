import Link from 'next/link';

import { Container, FooterHeader, SocialButtons, FooterDivisionLine, FooterFooter } from '@/styles/components/organisms/Footer';

import instagram from '@/assets/components/organisms/Footer/instagram.svg';
import facebook from '@/assets/components/organisms/Footer/facebook.svg';

const Footer = () => {
  return (
    <Container>
      <FooterHeader>
        <div>
          <h4>Nos siga nas redes sociais</h4>

          <SocialButtons>
            <Link href="https://www.facebook.com/heali.br">
              <img src={facebook} alt="facebook"/>
            </Link>

            <Link href="https://www.instagram.com/heali.br">
              <img src={instagram} alt="instagram"/>
            </Link>
          </SocialButtons>
        </div>

        <span className="heali-span">heali</span>

      </FooterHeader>

      <FooterDivisionLine />

      <FooterFooter>
        <p>
        2020 - © Copyright Heali.me <span className="span-dash">&nbsp;-&nbsp;</span>
        CNPJ: 35.087.847/0001-30
        </p>
      </FooterFooter>
    </Container>
  )
}

export default Footer;
