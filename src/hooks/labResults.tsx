import { createContext, useContext, useState, useCallback } from 'react';

import formatValue from '@/utils/formatValue';
import formatDistance from '@/utils/formatDistance';
import LabResultFromAPI from '@/@types/LabResultFromAPI';
import useFetch from '@/services/hooks/useFetch';

interface GetLabResultsOptions {
  onlyExamsCompleteLabs?: boolean;
  maxDistance?: number;
  brands?: string[];
}

interface GetLabResultsDTO {
  examsIds: string[];
  address: string;
  latitude: number;
  longitude: number;
  options?: GetLabResultsOptions;
}

export interface LabResultFromAPIFormatted extends LabResultFromAPI {
  distanceFormatted: string;
  totalPriceFormatted: string;
}

interface LabResultsContextData {
  results: LabResultFromAPIFormatted[];
  getLabResults(params: GetLabResultsDTO): Promise<void>;
}

const LabResultsContext = createContext<LabResultsContextData>(
  {} as LabResultsContextData,
);

const LabResultsProvider = ({ children }) => {
  const [results, setResults] = useState<LabResultFromAPIFormatted[]>([]);

  const getLabResults = useCallback(
    async ({
      examsIds,
      address,
      latitude,
      longitude,
      options,
    }: GetLabResultsDTO): Promise<void> => {
      try {
        const ApiCall = useFetch<LabResultFromAPIFormatted[]>('/search/results', {
          params: {
            ids: examsIds,
            add: address,
            lat: latitude,
            lng: longitude,
            completeOnly: options?.onlyExamsCompleteLabs,
            dist: options?.maxDistance,
            brands: options?.brands,
          },
        });

        const ApiResults = ApiCall.data;

        const resultsFormatted = ApiResults.map(result => {
          return {
            ...result,
            distanceFormatted: formatDistance(result.distance),
            totalPriceFormatted: formatValue(result.total_price),
          };
        });

        setResults(resultsFormatted);
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

  return (
    <LabResultsContext.Provider
      value={{
        results,
        getLabResults,
      }}
    >
      {children}
    </LabResultsContext.Provider>
  );
};

function useLabResults(): LabResultsContextData {
  const context = useContext(LabResultsContext);

  if (!context) {
    throw new Error('useLabResults must be used within a LabResultsProvider');
  }

  return context;
}

export { LabResultsProvider, useLabResults };
