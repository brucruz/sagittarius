/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, useMemo, ReactElement } from 'react';
import Exam from '@/@types/Exam';
import { EXAMS as EXAMS_CONSTANT } from '@/constants/examsSearch';
import { MdSearch, MdPlace } from 'react-icons/md';
import arrowIcon from '@/assets/components/molecules/EditSearch/arrow-edit-search.svg';
import Input from '@/components/atom/Input';
import examIndex from '@/services/search';
import { buildSearchQuery, executeSearchQuery } from '@/helpers/searchExams';
import usePlacesAutocomplete from 'use-places-autocomplete';
import ExamSearchResult from '@/@types/ExamSearchResult';
import {
  Container,
  Header,
  Content,
} from '@/styles/components/molecules/EditSearchMobile';
import mixpanel from 'mixpanel-browser';
import { useAuth } from '@/hooks/auth';
import { useSearchExam } from '@/hooks/searchExam';
import ButtonBack from '../atom/ButtonBack';
import InputWithSuggestions from './InputWithSuggestions';
import SelectedExams from '../atom/SelectedExams';

const EditSearch = (): ReactElement => {
  const router = useRouter();

  const [displaySearchContent, setDisplaySearchContent] = useState(false);
  const [examError, setExamError] = useState('');
  const [examTypedValue, setExamTypedValue] = useState('');
  const [examResults, setExamResults] = useState<Exam[]>([]);

  const { addExam, exams, address } = useSearchExam();
  const { user } = useAuth();

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

  useEffect(() => {
    address && setValue(address.address);
  }, [address, setValue]);

  useEffect(() => {
    executeSearchQuery({ examTypedValue, setExamError, setExamResults, user });
  }, [examTypedValue, exams, user]);

  const handleGetAddressInnerValue = useCallback(
    (address: string) => {
      setValue(address);
    },
    [setValue],
  );

  const handleExamSelection = useCallback(
    (exam: Exam): void => {
      addExam(exam);
    },
    [addExam],
  );

  const handleClearExamSuggestions = useCallback(() => {
    setExamResults([]);
  }, []);

  const handleGetExamInnerValue = useCallback((exam: string) => {
    setExamTypedValue(exam);
  }, []);

  const resultsSearchUrl = useMemo(() => buildSearchQuery(address, exams), [
    address,
    exams,
  ]);

  useEffect(() => {
    if (
      window.location.search !== `?${resultsSearchUrl}` &&
      resultsSearchUrl !== ''
    ) {
      router.push({
        pathname: `${window.location.pathname}`,
        search: resultsSearchUrl,
      });
    }
  }, [resultsSearchUrl, router]);

  return (
    <Container
      className={router.pathname.includes('detalhe') && 'in-detail-page'}
    >
      <ButtonBack
        onClick={() =>
          router.push({
            pathname: router.pathname.includes('detalhe') ? '/resultado' : '/',
            search: router.pathname.includes('detalhe') && resultsSearchUrl,
          })
        }
      />
      <Header>
        <span>Editar Busca</span>
        <img
          src={arrowIcon}
          alt="Flecha indicando abrir componente"
          onClick={() => setDisplaySearchContent(!displaySearchContent)}
        />
      </Header>
      {displaySearchContent && (
        <Content>
          <InputWithSuggestions
            name="exam"
            label="Seus Exames"
            error={examError}
            suggestions={{
              type: EXAMS_CONSTANT,
              data: examResults,
              getSelectedExam: handleExamSelection,
              clearSuggestions: handleClearExamSuggestions,
            }}
            getInputValue={handleGetExamInnerValue}
            value={examTypedValue}
          />

          <SelectedExams suggestions={EXAMS_CONSTANT} />

          <InputWithSuggestions
            name="location"
            label="Sua Localização"
            suggestions={{
              type: 'address',
              data: addressSuggestions,
              getSelectedAddress: setValue,
              clearSuggestions: clearAddressSuggestions,
            }}
            getInputValue={handleGetAddressInnerValue}
            value={addressValue}
          />
        </Content>
      )}
    </Container>
  );
};

export default EditSearch;
