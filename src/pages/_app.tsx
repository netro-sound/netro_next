import type { AppProps } from 'next/app';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import '@/styles/tailwind.scss';
import { Toaster } from 'react-hot-toast';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  permissions?: number[];
  overrideLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => <DefaultLayout page={Component}>{page}</DefaultLayout>);

  return getLayout(
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default App;
