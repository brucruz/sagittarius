import api from '../api';
import useSWR from 'swr';
import { AxiosRequestConfig } from 'axios';

export const useFetch = (url: string, options: AxiosRequestConfig) => {
  const { data: response, error, mutate } = useSWR(url, async (url: string) => await api.get(url, options));

  return { response, error, mutate };
}
