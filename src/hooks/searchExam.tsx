import { createContext, useCallback, useState, useContext, useEffect } from 'react';
import Exam from '@/@types/Exam';
import Address from '@/@types/Address';

interface SearchExamContextData {
  exams: Exam[];
  address: Address;
  addExam(exam: Exam): void;
  removeExam(id: string): void;
  addAddress(data: Address): void;
  removeAddress(): void;
}

const SearchExamContext = createContext<SearchExamContextData>(
  {} as SearchExamContextData,
);

const SearchExamProvider = ({ children }) => {
  const [examsToQuote, setExamsToQuote] = useState<Exam[]>([] as Exam[]);

  useEffect(() => {
    const exams = sessionStorage.getItem('@Heali:lastExamsSearched');

    if (exams) {
       setExamsToQuote(JSON.parse(exams));
    } else {
      setExamsToQuote([] as Exam[]);
    }
  }, []);

  const [address, setAddress] = useState<Address>({} as Address);

  useEffect(() => {
    const storagedAddress = sessionStorage.getItem(
      '@Heali:lastAddressSearched',
    );

    if (storagedAddress) {
      setAddress(JSON.parse(storagedAddress));
    } else {
      setAddress({} as Address);
    }
  }, []);

  const addExam = useCallback(
    (examToQuote: Exam) => {
      const examIndex = examsToQuote.findIndex(
        exam => exam.id === examToQuote.id,
      );

      if (examIndex >= 0) {
        examsToQuote.splice(examIndex, 1);

        sessionStorage.setItem(
          '@Heali:lastExamsSearched',
          JSON.stringify([...examsToQuote]),
        );

        setExamsToQuote([...examsToQuote]);
      } else {
        setExamsToQuote(oldExamsToQuote => {
          sessionStorage.setItem(
            '@Heali:lastExamsSearched',
            JSON.stringify([...oldExamsToQuote, examToQuote]),
          );

          return [...oldExamsToQuote, examToQuote];
        });
      }
    },
    [examsToQuote],
  );

  const removeExam = useCallback(
    (id: string) => {
      const newExams = examsToQuote.filter(exam => exam.id !== id);
      setExamsToQuote(newExams);
      sessionStorage.setItem(
        '@Heali:lastExamsSearched',
        JSON.stringify(newExams),
      );
    },
    [examsToQuote],
  );

  const addAddress = useCallback((data: Address) => {
    setAddress(data);

    sessionStorage.setItem('@Heali:lastAddressSearched', JSON.stringify(data));
  }, []);

  const removeAddress = useCallback(() => {
    setAddress({} as Address);
  }, []);

  return (
    <SearchExamContext.Provider
      value={{
        exams: examsToQuote,
        address,
        addExam,
        removeExam,
        addAddress,
        removeAddress,
      }}
    >
      {children}
    </SearchExamContext.Provider>
  );
};

function useSearchExam(): SearchExamContextData {
  const context = useContext(SearchExamContext);

  if (!context) {
    throw new Error('useSearchExam must be used within a SearchExamProvider');
  }

  return context;
}

export { SearchExamProvider, useSearchExam };
