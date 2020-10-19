import { Container, Content, Logo, Line } from "../../styles/components/organisms/Navbar";
import NavbarMenu from "../molecule/NavbarMenu";

export default function Navbar() {
  return (
    <Container>
      <Content>
        <Logo>Heali</Logo>

        <NavbarMenu />
      </Content>

      <Line />
    </Container>
  )
}
