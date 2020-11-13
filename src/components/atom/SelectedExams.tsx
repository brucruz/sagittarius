import { useSearchExam } from '@/hooks/searchExam';
import { useAuth } from '@/hooks/auth';
import {
  SelectedExamsContainer,
  SelectedExamsSummary,
  SelectedExamsDetail,
} from '@/styles/components/atom/SelectedExams';
import { ReactElement, useCallback, useState } from 'react';
import mixpanel from 'mixpanel-browser';
import Exam from '@/@types/Exam';
import { EXAMS as EXAMS_CONSTANT } from '@/constants/examsSearch';
import useClickOutsideRef from '@/hooks/clickOutside';

import {
  MdClose,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';

interface SelectedExamsProps {
  suggestions?: 'exams' | 'address';
}

const SelectedExams = ({ suggestions }: SelectedExamsProps): ReactElement => {
  const [isOpenSelectedExams, setIsOpenSelectedExams] = useState(false);

  const { exams, removeExam } = useSearchExam();
  const { user } = useAuth();

  const handleExamRemove = useCallback(
    (exam: Exam) => {
      exams.length === 0 && setIsOpenSelectedExams(false);

      user && mixpanel.identify(user.id);
      mixpanel.track('Remove Exam From Search', {
        Exam: exam.title,
      });

      removeExam(exam.id);
    },
    [exams, removeExam, user],
  );

  const handleClickOutsideSelectedExams = useCallback(() => {
    setIsOpenSelectedExams(false);
  }, []);

  const clickOutsideUserSelectedExams = useClickOutsideRef(
    handleClickOutsideSelectedExams,
  );

  return (
    <SelectedExamsContainer ref={clickOutsideUserSelectedExams}>
      {exams?.length > 0 && suggestions === EXAMS_CONSTANT && (
        <SelectedExamsSummary
          onClick={() => setIsOpenSelectedExams(!isOpenSelectedExams)}
        >
          {exams.length === 1 ? (
            <p>1 exame selecionado</p>
          ) : (
            <p>{exams.length} exames selecionados</p>
          )}
          <button
            type="button"
            onClick={() => setIsOpenSelectedExams(!isOpenSelectedExams)}
          >
            {isOpenSelectedExams ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </button>
        </SelectedExamsSummary>
      )}

      {isOpenSelectedExams && (
        <SelectedExamsDetail>
          {exams.map(exam => (
            <article key={exam.id}>
              <p>{exam.title}</p>
              <MdClose onClick={() => handleExamRemove(exam)} />
            </article>
          ))}
        </SelectedExamsDetail>
      )}
    </SelectedExamsContainer>
  );
};

export default SelectedExams;
