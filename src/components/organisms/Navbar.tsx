
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { Container, Content, Logo, SidebarAndLogo, Badges, NavLinks } from "../../styles/components/organisms/Navbar";
import BagBadge from "../molecule/BagBadge";
import SidebarMenu from "../molecule/SidebarMenu";
import UserMenu from "../molecule/UserMenu";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <SidebarAndLogo>
          <SidebarMenu />

          <Link href='/'>
            <Logo>Heali</Logo>
          </Link>
        </SidebarAndLogo>

        <NavLinks>
          <Link href="/#sobre">
            <a>Sobre Nós</a>
          </Link>

          <Link href="/#como-funciona">
            <a>Como Funciona</a>
          </Link>

          <Link href="/#nossos-servicos">
            <a>Nossos Serviços</a>
          </Link>

          <Link href="">
            <a>Para Laboratórios</a>
          </Link>
        </NavLinks>

        <Badges>
          <UserMenu />

          { user && <BagBadge />}
        </Badges>
      </Content>
    </Container>
  )
}
