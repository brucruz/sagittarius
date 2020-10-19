import ButtonNext from "../atom/ButtonNext";
import { useCallback, useState } from "react";

import banner from '@/assets/components/organisms/SearchExam/banner.svg';
import { MdSearch, MdPlace } from 'react-icons/md'

import { AddressState, Banner, Container, ExamState, InitialState, InitialStateContent, ValueProposition } from "@/styles/components/organisms/SearchExam";
import TitleMain from "../molecule/TitleMain";
import { HeaderSpaceContent } from "@/styles/components/atom/HeaderSpace";
import PageHeader from "../molecule/PageHeader";
import Input from "../atom/Input";
import Exam from "@/@types/Exam";

type SearchDisplay = 'initial' | 'exam' | 'address';

const exams: Exam[] = [
  {
    id: '001',
    title: 'Hemograma completo',
    slug: 'hemograma-completo',
    created_date: 'now',
    updated_date: 'now',
  },
  {
    id: '002',
    title: 'Glicose',
    slug: 'glicose',
    created_date: 'now',
    updated_date: 'now',
  },
  {
    id: '003',
    title: 'Ecocardiograma com Doppler Colorido',
    slug: 'ecocardiograma-com-doppler-olorido',
    created_date: 'now',
    updated_date: 'now',
  },
]

const SearchExam = () => {
  const [searchDisplay, setSearchDisplay] = useState<SearchDisplay>('exam');

  const handleBeginButtonClick = useCallback(() => {
    setSearchDisplay('exam');
  }, []);

  const handleExamSubmit = useCallback(() => {
    setSearchDisplay('address');
  }, []);

  const handleReturnButtonClick = useCallback((state: SearchDisplay) => {
    setSearchDisplay(state);
  }, []);

  console.log(searchDisplay);

  return (
    <Container>
      <HeaderSpaceContent />

      {searchDisplay === 'initial' && (
        <InitialState>
          <Banner src={banner} alt="banner"/>

          <InitialStateContent>
            <ValueProposition>
              <h1>Vários exames para agendar?<br />
              Deixa com a Heali!</h1>
              <h3>Busque, compare laboratórios e agende</h3>
            </ValueProposition>

            <ButtonNext type="button" text="Começar" onClick={handleBeginButtonClick}/>
          </InitialStateContent>
        </InitialState>
      )}

      {searchDisplay === 'exam' && (
        <ExamState>
          <PageHeader type='button' backButtonNewState="initial" backButtonStateCallback={handleReturnButtonClick} stepper='1/2'/>

          <TitleMain title="Quais exames está buscando?" subtitle="Digite e adicione os exames que quer agendar."/>

          <Input
            name='exam'
            label='Seus Exames'
            icon={MdSearch}
            suggestions={{
              type: 'exams',
              data: exams,
            }}
          />

          <ButtonNext text="Continuar" onClick={handleExamSubmit}/>
        </ExamState>
      )}

      {searchDisplay === 'address' && (
        <AddressState>
          <PageHeader type='button' backButtonNewState="exam" backButtonStateCallback={handleReturnButtonClick} stepper='2/2'/>

          <TitleMain title="Onde quer fazer os exames?" subtitle="Digite o endereço, bairro ou cidade de onde quer fazer o exame."/>

          <Input name='location' label='Sua Localização' icon={MdPlace}/>

          <ButtonNext text="Continuar"/>
        </AddressState>
      )}

    </Container>
  )
}

export default SearchExam;
