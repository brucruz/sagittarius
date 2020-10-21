import { Container, HamburguerButton, Menu, MenuLinks } from '@/styles/components/molecules/SidebarMenu';
import Link from 'next/link';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Container>
      <HamburguerButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdMenu />
      </HamburguerButton>

      <Menu
        isOpen={isOpen}
      >
        <MenuLinks>
          <Link href="">
            <p>Sobre Nós</p>
          </Link>

          <Link href="">
            <p>Como Funciona</p>
          </Link>

          <Link href="">
            <p>Nossos Serviços</p>
          </Link>

          <Link href="">
            <p>Para Laboratórios</p>
          </Link>
        </MenuLinks>
      </Menu>
    </Container>
  )
}

export default SidebarMenu;
