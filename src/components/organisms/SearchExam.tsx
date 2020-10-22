import ButtonNext from "../atom/ButtonNext";
import { useCallback, useEffect, useState } from "react";

import banner from '@/assets/components/organisms/SearchExam/banner.svg';
import { MdSearch, MdPlace } from 'react-icons/md'

import { AddressState, Banner, Container, ExamState, InitialState, InitialStateContent, ValueProposition } from "@/styles/components/organisms/SearchExam";
import TitleMain from "../molecule/TitleMain";
import { HeaderSpaceContent } from "@/styles/components/atom/HeaderSpace";
import PageHeader from "../molecule/PageHeader";
import Input from "../atom/Input";
import Exam from "@/@types/Exam";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useSearchExam } from "@/hooks/searchExam";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import ExamSearchResult from "@/@types/ExamSearchResult";
import examIndex from "@/services/search";

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
    slug: 'ecocardiograma-com-doppler-colorido',
    created_date: 'now',
    updated_date: 'now',
  },
  {
    id: '004',
    title: 'Bilirrubinas',
    slug: 'bilirrubinas',
    created_date: 'now',
    updated_date: 'now',
  },
  {
    id: '005',
    title: 'Ultrassom da Tireóide',
    slug: 'ultrassom-da-tireoide',
    created_date: 'now',
    updated_date: 'now',
  },
  {
    id: '006',
    title: 'Ultrassonografia do Membro Inferior Esquerdo com Doppler Colorido',
    slug: 'ultrassonografia-do-membro-inferior-esquerdo-com-doppler-colorido',
    created_date: 'now',
    updated_date: 'now',
  },
]

const SearchExam = () => {
  const [searchDisplay, setSearchDisplay] = useState<SearchDisplay>('initial');
  const [examTypedValue, setExamTypedValue] = useState('');
  const [selectedExams, setSelectedExams] = useState<Exam[]>([]);
  const [examResults, setExamResults] = useState<Exam[]>([]);
  const [hasAddress, setHasAddress] = useState(false);
  const [disableSearchButton, setDisableSearchButton] = useState(true);

  const {
    ready,
    value: addressValue,
    suggestions: { status, data: addressSuggestions },
    setValue,
    clearSuggestions: clearAddressSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      bounds: {
        north: -23.38,
        east: -46.37,
        south: -23.85,
        west: -46.94,
      },
    },
  });

  const { addExam, addAddress, removeExam, exams, address } = useSearchExam();
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (address.address && !addressValue) {
      setValue(address.address, false);
      setHasAddress(true);
    }
  }, [address, addressValue, setValue]);

  useEffect(() => {
    exams.length === 0 || !hasAddress
      ? setDisableSearchButton(true)
      : setDisableSearchButton(false);
  }, [exams.length, hasAddress]);

  useEffect(() => {
    examTypedValue !== ''
      ? examIndex
          .search<ExamSearchResult>(examTypedValue, {
            attributesToRetrieve: ['title', 'alternative_titles'],
            hitsPerPage: 5,
            clickAnalytics: true,
            analytics: true,
          })
          .then(({ hits }) => {
            const results = hits.map(hit => {
              return {
                id: hit.objectID,
                title: hit.title,
                slug: hit.slug,
                alternative_titles: hit.alternative_titles,
                created_date: '',
                updated_date: '',
              };
            });

            setExamResults(results);
          })
          .catch(err => console.log(err))
      : setExamResults([]);
  }, [examTypedValue, exams]);

  const handleBeginButtonClick = useCallback(() => {
    setSearchDisplay('exam');
  }, []);

  const handleExamSubmit = useCallback(() => {
    setSearchDisplay('address');
  }, []);

  const handleReturnButtonClick = useCallback((state: SearchDisplay) => {
    setSearchDisplay(state);
  }, []);

  const handleGetAddressInnerValue = useCallback((address: string) => {
    setValue(address);
  }, []);

  const handleGetExamInnerValue = useCallback((exam: string) => {
    setExamTypedValue(exam);
  }, []);

  const handleExamSelection = useCallback((exam: Exam): void => {
    addExam(exam);
  }, []);

  const handleClearExamSuggestions = useCallback(() => {
    setExamResults([]);
  }, []);

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
              data: examResults,
              getSelectedExam: handleExamSelection,
              clearSuggestions: handleClearExamSuggestions,
            }}
            getInputValue={handleGetExamInnerValue}
          />

          <ButtonNext text="Continuar" onClick={handleExamSubmit} disabled={exams.length < 1}/>
        </ExamState>
      )}

      {searchDisplay === 'address' && (
        <AddressState>
          <PageHeader type='button' backButtonNewState="exam" backButtonStateCallback={handleReturnButtonClick} stepper='2/2'/>

          <TitleMain title="Onde quer fazer os exames?" subtitle="Digite o endereço, bairro ou cidade de onde quer fazer o exame."/>

          <Input
            name='location'
            label='Sua Localização'
            icon={MdPlace}
            suggestions={{
              type: 'address',
              data: addressSuggestions,
              getSelectedAddress: setValue,
              clearSuggestions: clearAddressSuggestions,
            }}
            getInputValue={handleGetAddressInnerValue}
            value={addressValue}
            selectedExams={selectedExams}
          />

          <ButtonNext text="Continuar" disabled={!address.address}/>
        </AddressState>
      )}

    </Container>
  )
}

export default SearchExam;
