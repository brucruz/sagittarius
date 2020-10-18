import ButtonNext from "../atom/ButtonNext";
import banner from '@/assets/components/organisms/SearchExam/banner.svg';
import { Banner, Container, InitialState, InitialStateContent, ValueProposition } from "@/styles/components/organisms/SearchExam";

export default function() {
  return (
    <Container>
      <InitialState>
        <Banner src={banner} alt="banner"/>

        <InitialStateContent>
          <ValueProposition>
            <h1>Vários exames para agendar?<br />
            Deixa com a Heali!</h1>
            <h3>Busque, compare laboratórios e agende</h3>
          </ValueProposition>

          <ButtonNext text="Começar"/>
        </InitialStateContent>
      </InitialState>

    </Container>
  )
}
