import Address from '@/@types/Address';
import querystring from 'query-string';
import Exam from '../@types/Exam';

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
