import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, useMemo, ReactElement } from 'react';
import Exam from '@/@types/Exam';
import { MdSearch, MdPlace } from 'react-icons/md';
// import arrowIcon from '@/assets/components/molecules/EditSearch/arrow-edit-search.svg';
import Input from '@/components/atom/Input';
import examIndex from '@/services/search';
import { buildSearchQuery, executeSearchQuery } from '@/helpers/searchExams';
import usePlacesAutocomplete from 'use-places-autocomplete';
import ExamSearchResult from '@/@types/ExamSearchResult';
import { Container } from '@/styles/components/molecules/EditSearchWeb';
import { useSearchExam } from '@/hooks/searchExam';
import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';
import { EXAMS as EXAMS_CONSTANT } from '@/constants/examsSearch';
import ButtonBack from '../atom/ButtonBack';

const EditSearchWeb = (): ReactElement => {
  const router = useRouter();

  const [examTypedValue, setExamTypedValue] = useState('');
  const [examResults, setExamResults] = useState<Exam[]>([]);
  const [examError, setExamError] = useState('');

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
    (typedAddress: string) => {
      setValue(typedAddress);
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
    <Container className={examError !== '' && 'has-error'}>
      <ButtonBack
        onClick={() =>
          router.push({
            pathname: router.pathname.includes('detalhe') ? '/resultado' : '/',
            search: router.pathname.includes('detalhe') && resultsSearchUrl,
          })
        }
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
    </Container>
  );
};

export default EditSearchWeb;
