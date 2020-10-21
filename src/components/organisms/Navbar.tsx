
import { Container, Content, Logo, Line, SidebarAndLogo } from "../../styles/components/organisms/Navbar";
import SidebarMenu from "../molecule/SidebarMenu";
import UserMenu from "../molecule/UserMenu";

export default function Navbar() {
  return (
    <Container>
      <Content>
        <SidebarAndLogo>
          <SidebarMenu />

          <Logo>Heali</Logo>
        </SidebarAndLogo>

        <UserMenu />
      </Content>
      <Line />
    </Container>
  )
}
