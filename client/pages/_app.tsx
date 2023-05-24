import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import { Notifications } from "@mantine/notifications";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "react-query";
import { MeContextProvider } from "@/context/me";

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>My App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}
      >
        <Notifications />
        <QueryClientProvider client={new QueryClient()}>
          <MeContextProvider>
          {getLayout(
            <main>
              <Component {...pageProps} />
            </main>
          )}
          </MeContextProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
