import {
  Container,
  HamburguerButton,
  Menu,
  MenuLinks,
} from '@/styles/components/molecules/SidebarMenu';
import Link from 'next/link';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <HamburguerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <MdMenu />
      </HamburguerButton>

      <Menu isOpen={isOpen}>
        <MenuLinks>
          <Link href="/#sobre">
            <a>
              <p>Sobre Nós</p>
            </a>
          </Link>

          <Link href="/#como-funciona">
            <a>
              <p>Como Funciona</p>
            </a>
          </Link>

          <Link href="/#nossos-servicos">
            <a>
              <p>Nossos Serviços</p>
            </a>
          </Link>

          {/* <Link href=""> */}
          {/* <a> */}
          <p>Para Laboratórios</p>
          {/* </a> */}
          {/* </Link> */}
        </MenuLinks>
      </Menu>
    </Container>
  );
};

export default SidebarMenu;
