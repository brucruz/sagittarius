import api from '../api';
import useSWR from 'swr';
import { AxiosRequestConfig } from 'axios';

export const useFetch = (url: string, options: AxiosRequestConfig) => {
  const { data, error, mutate } = useSWR(url, (url: string) => api.get(url, options));

  return { data, error, mutate };
}