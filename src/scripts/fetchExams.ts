import Exam from '@/@types/Exam';
import api from '@/services/api';

export default async function fetchExams(): Promise<Exam[]> {
  const { data } = await api.get<Exam[]>('/exams');

  return data;
}
