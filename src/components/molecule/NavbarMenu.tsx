import { Container } from '@/styles/components/molecules/NavbarMenu';

import hamburgerButton from '@/assets/components/molecules/NavbarMenu/HamburgerButton.svg';

export default function NavbarMenu() {

  return (
    <Container>
      <div>
        <img src={hamburgerButton} alt="menu"/>
      </div>
    </Container>
  )
}
