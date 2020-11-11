import Address from '@/@types/Address';
import querystring from 'query-string';
import examIndex from '@/services/search';
import ExamSearchResult from '@/@types/ExamSearchResult';
import mixpanel from 'mixpanel-browser';
import User from '@/@types/User';
import Exam from '../@types/Exam';

interface searchQueryProps {
  examTypedValue: string;
  setExamError: (value: string) => void;
  setExamResults: (examResults: Exam[]) => void;
  user: User;
}

export const buildSearchQuery = (address: Address, exams: Exam[]): string =>
  querystring.stringify(
    {
      add: address.address,
      lat: address.latitude,
      lng: address.longitude,
      slg: exams.map((exam: Exam) => exam.slug),
      // ids: exams.map((exam: Exam) => exam.id),
    },
    { arrayFormat: 'bracket' },
  );

export const executeSearchQuery = ({
  examTypedValue,
  setExamError,
  setExamResults,
  user,
}: searchQueryProps): void => {
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
};
