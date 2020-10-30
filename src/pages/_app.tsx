import { useEffect } from 'react';
import { useRouter } from "next/router";

import { SWRConfig } from 'swr';
import mixpanel from 'mixpanel-browser';
import * as gtag from "@/services/analytics";

import AppProvider from '@/hooks';
import GlobalStyle from "../styles/GlobalStyle";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  mixpanel.init(
    process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
      ? process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
      : '',
    {
      track_links_timeout: 300,
    },
  );

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
