import OriginalExam from '@/@types/OriginalExam';
import api from '@/services/api';

export default async function fetchAssociatedOriginalExams(): Promise<
  OriginalExam[]
> {
  const { data } = await api.get<OriginalExam[]>('/originalexams/associated');

  return data;
}
