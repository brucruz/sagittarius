import { createContext, useCallback, useState, useContext, useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

interface DatesContextData {
  preferredDateFrom: Date;
  preferredDateTo: Date;
  selectPreferredFromDate: (from: Date) => void;
  selectPreferredToDate: (to: Date) => void;
}

const DatesContext = createContext<DatesContextData>({} as DatesContextData);

const DatesProvider = ({ children }) => {
  const [preferredDateFrom, setPreferredDateFrom] = useState<Date>(null);
  const [preferredDateTo, setPreferredDateTo] = useState<Date>(null);

  // const [preferredHours, setPreferredHours] = useState(null);

  useEffect(() => {
    const from = localStorage.getItem('@Heali:preferredDateFrom');
    const to = localStorage.getItem('@Heali:preferredDateTo');

    if (from && to) {
      setPreferredDateFrom(JSON.parse(from));
      setPreferredDateTo(JSON.parse(to));
    } else {
      setPreferredDateFrom(null);
      setPreferredDateTo(null);
    }
  }, []);

  const selectPreferredFromDate = useCallback((from: Date): void => {
    localStorage.setItem('@Heali:preferredDateFrom', JSON.stringify(from));

    mixpanel.register({
        'Preferred Date: from': from,
      },
      1
    )

    setPreferredDateFrom(from);
  }, []);

  const selectPreferredToDate = useCallback((to: Date): void => {
    localStorage.setItem('@Heali:preferredDateTo', JSON.stringify(to));

    mixpanel.register({
        'Preferred Date: to': to,
      },
      1
    )

    setPreferredDateTo(to);
  }, []);

  return (
    <DatesContext.Provider
      value={{
        preferredDateFrom,
        preferredDateTo,
        selectPreferredFromDate,
        selectPreferredToDate,
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
