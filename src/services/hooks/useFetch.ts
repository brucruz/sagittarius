/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import useSWR from 'swr';
import { AxiosRequestConfig } from 'axios';
import api from '../api';

export default function useFetch<Data = any, Error = any>(
  url: string,
  options: AxiosRequestConfig,
) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
    const response = await api.get(url, options);

    return response.data;
  });

  return { data, error, mutate };
}
