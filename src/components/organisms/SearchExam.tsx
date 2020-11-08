/* eslint-disable no-shadow */
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState, ReactElement } from 'react';

import { MdSearch, MdPlace } from 'react-icons/md';
import mixpanel from 'mixpanel-browser';
import {
  AddressState,
  Container,
  ExamState,
} from '@/styles/components/organisms/SearchExam';
import { HeaderSpaceContent } from '@/styles/components/atom/HeaderSpace';
import Exam from '@/@types/Exam';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { useSearchExam } from '@/hooks/searchExam';
import { useAuth } from '@/hooks/auth';
import { useToast } from '@/hooks/toast';
import ExamSearchResult from '@/@types/ExamSearchResult';
import examIndex from '@/services/search';
import { buildSearchQuery } from '@/helpers/searchExams';
import {
  EXAMS as EXAMS_CONSTANT,
  EXAM as EXAM_CONSTANT,
} from '@/constants/examsSearch';
import Input from '../atom/Input';
import PageHeader from '../molecule/PageHeader';
import TitleMain from '../molecule/TitleMain';
import ButtonNext from '../atom/ButtonNext';
import InitialState from '../molecule/HomeInitialState';

type SearchDisplay = 'initial' | 'exam' | 'address';

const SearchExam = (): ReactElement => {
  const [searchDisplay, setSearchDisplay] = useState<SearchDisplay>('initial');
  const [examTypedValue, setExamTypedValue] = useState('');
  const [examResults, setExamResults] = useState<Exam[]>([]);
  const [examError, setExamError] = useState('');

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

  const router = useRouter();

  const { addExam, exams, address } = useSearchExam();
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    address && setValue(address.address);
  }, [address, setValue]);

  useEffect(() => {
    if (examTypedValue !== '') {
      examIndex
        .search<ExamSearchResult>(examTypedValue, {
          attributesToRetrieve: ['title', 'alternative_titles', 'slug'],
          hitsPerPage: 5,
          clickAnalytics: true,
          analytics: true,
        })
        .then(({ hits, query }) => {
          if (hits.length === 0) {
            setExamError('Desculpe, não localizamos este exame.');

            user && mixpanel.identify(user.id);
            mixpanel.register(
              {
                'Not Found Exam': query,
              },
              1,
            );
            mixpanel.track('Exam Not Found - Display error message');
          } else {
            setExamError('');
          }

          const results = hits.map(hit => {
            return {
              id: hit.objectID,
              title: hit.title,
              slug: hit.slug,
              alternative_titles: hit.alternative_titles,
              highlightedWords: hit.highlightResult,
              created_date: hit.created_date,
              updated_date: hit.updated_date,
            };
          });

          setExamResults(results);
        })
        .catch(err => console.log(err));
    } else {
      setExamResults([]);
      setExamError('');
    }
  }, [examTypedValue, exams, user]);

  const resultsSearchUrl = useMemo(() => buildSearchQuery(address, exams), [
    address,
    exams,
  ]);

  const examsTitles = useMemo(() => {
    return exams.map(exam => exam.title);
  }, [exams]);

  const handleSubmit = useCallback(() => {
    // no server, criar table e service de pesquisas, contendo: date, user, exams e address
    // criar envio desses dados para server

    if (exams.length === 0) {
      addToast({
        type: 'error',
        title: 'Você precisa informar seus exames',
        description: 'Para prosseguir, informe os exames que está buscando',
      });

      user && mixpanel.identify(user.id);
      mixpanel.register(
        {
          Exams: examsTitles,
          Address: address,
          'Result Direct Access': false,
        },
        1, // cookie: 1 day storage
      );
      mixpanel.track('Exam Search', {
        Status: 'Error: exam missing',
      });

      return;
    }

    if (!address) {
      addToast({
        type: 'error',
        title: 'Você precisa informar seu endereço',
        description: 'Informe um endereço de referência para poder prosseguir',
      });

      user && mixpanel.identify(user.id);
      mixpanel.register(
        {
          Exams: examsTitles,
          Address: address,
          'Result Direct Access': false,
        },
        1, // cookie: 1 day storage
      );
      mixpanel.track('Exam Search', {
        Status: 'Error: address missing',
      });

      return;
    }

    user && mixpanel.identify(user.id);
    mixpanel.register(
      {
        'Searched Exams': examsTitles,
        'Searched Address': address.address,
        'Result Direct Access': false,
      },
      1, // cookie: 1 day storage
    );
    mixpanel.track('Exam Search', {
      Status: 'Success',
    });

    router.push({
      pathname: '/resultado',
      search: resultsSearchUrl,
    });
  }, [router, user, addToast, resultsSearchUrl, exams, address, examsTitles]);

  const handleBeginButtonClick = useCallback(() => {
    setSearchDisplay(EXAM_CONSTANT);
  }, []);

  const handleExamSubmit = useCallback(() => {
    setSearchDisplay('address');
  }, []);

  const handleReturnButtonClick = useCallback((state: SearchDisplay) => {
    setSearchDisplay(state);
  }, []);

  const handleGetAddressInnerValue = useCallback(
    (address: string) => {
      setValue(address);
    },
    [setValue],
  );

  const handleGetExamInnerValue = useCallback((exam: string) => {
    setExamTypedValue(exam);
  }, []);

  const handleExamSelection = useCallback(
    (exam: Exam): void => {
      addExam(exam);
    },
    [addExam],
  );

  const handleClearExamSuggestions = useCallback(() => {
    setExamResults([]);
  }, []);

  return (
    <Container>
      <HeaderSpaceContent />

      {searchDisplay === 'initial' && (
        <InitialState beginButtonCallback={handleBeginButtonClick} />
      )}

      {searchDisplay === EXAM_CONSTANT && (
        <ExamState>
          <PageHeader
            buttonType={{
              type: 'change_state_button',
              backButtonNewState: 'initial',
              backButtonStateCallback: handleReturnButtonClick,
              stepper: '1/2',
            }}
          />

          <TitleMain
            title="Quais exames está buscando?"
            subtitle="Digite e adicione os exames que quer agendar."
          />
          <Input
            name="exam"
            label="Seus Exames"
            errorProps={examError}
            icon={MdSearch}
            suggestions={{
              type: EXAMS_CONSTANT,
              data: examResults,
              getSelectedExam: handleExamSelection,
              clearSuggestions: handleClearExamSuggestions,
            }}
            getInputValue={handleGetExamInnerValue}
          />

          <ButtonNext
            text="Continuar"
            onClick={handleExamSubmit}
            disabled={exams.length < 1}
          />
        </ExamState>
      )}

      {searchDisplay === 'address' && (
        <AddressState>
          <PageHeader
            buttonType={{
              type: 'change_state_button',
              backButtonNewState: EXAM_CONSTANT,
              backButtonStateCallback: handleReturnButtonClick,
              stepper: '2/2',
            }}
          />

          <TitleMain
            title="Onde quer fazer os exames?"
            subtitle="Digite o endereço, bairro ou cidade de onde quer fazer o exame."
          />

          <Input
            name="location"
            label="Sua Localização"
            icon={MdPlace}
            suggestions={{
              type: 'address',
              data: addressSuggestions,
              getSelectedAddress: setValue,
              clearSuggestions: clearAddressSuggestions,
            }}
            getInputValue={handleGetAddressInnerValue}
            value={addressValue}
          />

          <ButtonNext
            text="Continuar"
            disabled={!address.address}
            onClick={handleSubmit}
          />
        </AddressState>
      )}
    </Container>
  );
};

export default SearchExam;
