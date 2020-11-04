import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, useMemo, ReactElement } from 'react';
import Exam from '@/@types/Exam';
import { MdSearch, MdPlace } from 'react-icons/md';
import arrowIcon from '@/assets/components/molecules/EditSearch/arrow-edit-search.svg';
import Input from '@/components/atom/Input';
import examIndex from '@/services/search';
import { buildSearchQuery } from '@/helpers/searchExams';
import usePlacesAutocomplete from 'use-places-autocomplete';
import ExamSearchResult from '@/@types/ExamSearchResult';
import { Container } from '@/styles/components/molecules/EditSearchWeb';
import { useSearchExam } from '@/hooks/searchExam';
import ButtonBack from '../atom/ButtonBack';

const EditSearchWeb = (): ReactElement => {
  const router = useRouter();

  const [examTypedValue, setExamTypedValue] = useState('');
  const [examResults, setExamResults] = useState<Exam[]>([]);

  const { addExam, exams, address } = useSearchExam();

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
  }, [address]);

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

  // eslint-disable-next-line no-shadow
  const handleGetAddressInnerValue = useCallback((address: string) => {
    setValue(address);
  }, []);

  const handleExamSelection = useCallback((exam: Exam): void => {
    addExam(exam);
  }, []);

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
  }, [resultsSearchUrl]);

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
      <Input
        name="exam"
        label="Seus Exames"
        icon={MdSearch}
        suggestions={{
          type: 'exams',
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
