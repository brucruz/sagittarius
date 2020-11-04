import {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import mixpanel from 'mixpanel-browser';

interface DatesContextData {
  preferredDateFrom: Date;
  preferredDateTo: Date;
  preferredHours: string[];
  selectPreferredFromDate: (from: Date) => void;
  selectPreferredToDate: (to: Date) => void;
  selectPreferredHour: (hour: string) => void;
}

const DatesContext = createContext<DatesContextData>({} as DatesContextData);

const DatesProvider = ({ children }) => {
  const [preferredDateFrom, setPreferredDateFrom] = useState<Date>(null);
  const [preferredDateTo, setPreferredDateTo] = useState<Date>(null);

  const [preferredHours, setPreferredHours] = useState<string[]>(
    [] as string[],
  );

  useEffect(() => {
    // const from = localStorage.getItem('@Heali:preferredDateFrom');
    // const to = localStorage.getItem('@Heali:preferredDateTo');

    const hours = localStorage.getItem('@Heali:preferredHours');

    if (/* from && to && */ hours) {
      // setPreferredDateFrom(JSON.parse(from));
      // setPreferredDateTo(JSON.parse(to));
      setPreferredHours(JSON.parse(hours));
    } else {
      // setPreferredDateFrom(null);
      // setPreferredDateTo(null);
      setPreferredHours([] as string[]);
    }
  }, []);

  const selectPreferredFromDate = useCallback((from: Date): void => {
    // localStorage.setItem('@Heali:preferredDateFrom', JSON.stringify(from));

    mixpanel.register(
      {
        'Preferred Date: from': from,
      },
      1,
    );

    setPreferredDateFrom(from);
  }, []);

  const selectPreferredToDate = useCallback((to: Date): void => {
    // localStorage.setItem('@Heali:preferredDateTo', JSON.stringify(to));

    mixpanel.register(
      {
        'Preferred Date: to': to,
      },
      1,
    );

    setPreferredDateTo(to);
  }, []);

  const selectPreferredHour = useCallback(
    (hour: string) => {
      if (preferredHours.includes(hour)) {
        const hourIndex = preferredHours.findIndex(
          preferredHour => preferredHour === hour,
        );

        const hours = preferredHours.filter(
          (hour, index) => index !== hourIndex && hour,
        );

        setPreferredHours(hours);
        localStorage.setItem('@Heali:preferredHours', JSON.stringify(hours));

        mixpanel.register(
          {
            'Preferred Hours': hours,
          },
          1,
        );
      } else {
        const newPreferredHours = [...preferredHours, hour];

        setPreferredHours(newPreferredHours);

        localStorage.setItem(
          '@Heali:preferredHours',
          JSON.stringify(newPreferredHours),
        );

        mixpanel.register(
          {
            'Preferred Hours': newPreferredHours,
          },
          1,
        );
      }
    },
    [preferredHours],
  );

  return (
    <DatesContext.Provider
      value={{
        preferredDateFrom,
        preferredDateTo,
        preferredHours,
        selectPreferredFromDate,
        selectPreferredToDate,
        selectPreferredHour,
      }}
    >
      {children}
    </DatesContext.Provider>
  );
};

function useDates(): DatesContextData {
  const context = useContext(DatesContext);

  if (!context) {
    throw new Error('useDates must be used within an datesProvider');
  }

  return context;
}

export { DatesProvider, useDates };
