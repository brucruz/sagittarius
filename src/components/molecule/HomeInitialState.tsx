import { InitialStateContainer, Banner, InitialStateContent, ValueProposition } from "@/styles/components/molecules/HomeInitialState";
import banner from '@/assets/components/organisms/SearchExam/banner.svg';
import ButtonNext from "../atom/ButtonNext";

interface InitialState {
  beginButtonCallback?: () => void;
}

const InitialState = ({ beginButtonCallback }: InitialState) => {

  return (
    <InitialStateContainer>
      <Banner src={banner} alt="banner"/>

      <InitialStateContent>
        <ValueProposition>
          <h1>Vários exames para agendar?<br />
          Deixa com a Heali!</h1>
          <h3>Busque, compare laboratórios e agende</h3>
        </ValueProposition>

        <ButtonNext type="button" text="Começar" onClick={beginButtonCallback}/>
      </InitialStateContent>
    </InitialStateContainer>
  )
};

export default InitialState;
