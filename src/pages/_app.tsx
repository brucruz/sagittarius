import AppProvider from '@/hooks';
import { SWRConfig } from 'swr';
import GlobalStyle from "../styles/GlobalStyle";

import mixpanel from 'mixpanel-browser';


export default function MyApp({ Component, pageProps }) {

  mixpanel.init(
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
      ? process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
      : '',
    {
      track_links_timeout: 300,
    },
  );

  return (
    <>
      <SWRConfig value={{
        // refreshInterval: 10000,
      }}>
        <AppProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </AppProvider>
      </SWRConfig>
    </>
  )
}
