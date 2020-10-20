import { SWRConfig } from 'swr';
import api from '../services/api';
import axios from 'axios';
import GlobalStyle from "../styles/GlobalStyle";


export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <SWRConfig value={{
        refreshInterval: 10000,
      }}>
        <GlobalStyle />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  )
}
