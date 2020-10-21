
import { useAuth } from "@/hooks/auth";
import { Container, Content, Logo, Line, SidebarAndLogo, Badges } from "../../styles/components/organisms/Navbar";
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

          <Logo>Heali</Logo>
        </SidebarAndLogo>

        <Badges>
          <UserMenu />

          { user && <BagBadge />}
        </Badges>
      </Content>
    </Container>
  )
}
