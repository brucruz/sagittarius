import { ReactElement } from 'react';
import {
  InitialStateContainer,
  Banner,
  InitialStateContent,
  ValueProposition,
} from '@/styles/components/molecules/HomeInitialState';
import banner from '@/assets/components/organisms/SearchExam/banner.svg';

interface InitialState {
  beginButtonCallback?: () => void;
}

const InitialState = ({ beginButtonCallback }: InitialState): ReactElement => {
  return (
    <InitialStateContainer>
      <Banner src={banner} alt="banner" />

      <InitialStateContent>
        <ValueProposition>
          <h1>
            Vários exames para agendar?
            <br />
            Deixa com a Heali!
          </h1>
          <h3>Busque, compare laboratórios e agende</h3>
        </ValueProposition>

        <button type="button" onClick={beginButtonCallback}>
          Começar
        </button>
      </InitialStateContent>
    </InitialStateContainer>
  );
};

export default InitialState;
