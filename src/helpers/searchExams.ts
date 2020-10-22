import querystring from 'query-string';
import Exam from '../@types/Exam';
import { Address } from '../hooks/searchExam';

export const buildSearchQuery = (address: Address, exams: Exam[]): string =>
  querystring.stringify(
    {
      add: address.address,
      lat: address.latitude,
      lng: address.longitude,
      ids: exams.map((exam: Exam) => exam.id),
    },
    { arrayFormat: 'bracket' },
  );
