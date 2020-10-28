
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/auth";
import { Container, Content, Logo, SidebarAndLogo, Badges, NavLinks } from "../../styles/components/organisms/Navbar";
import SidebarMenu from "../molecule/SidebarMenu";
import UserMenu from "../molecule/UserMenu";

const BagBadge = dynamic(
  () => import("@/components/molecule/BagBadge"),
  {
    ssr: true,
  }
);

export default function Navbar() {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <SidebarAndLogo>
          <SidebarMenu />

          <Logo>Heali</Logo>
        </SidebarAndLogo>

        <NavLinks>
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
        </NavLinks>

        <Badges>
          <UserMenu />

          { user && <BagBadge />}
        </Badges>
      </Content>
    </Container>
  )
}
