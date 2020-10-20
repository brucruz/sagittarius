import { SWRConfig } from 'swr';
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
