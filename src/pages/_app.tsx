import type { AppProps } from 'next/app';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import '@/styles/tailwind.scss';
import { Toaster } from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import useSeoStore from '@/stores/useSeoStore';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  permissions?: number[];
  overrideLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [getSeo] = useSeoStore((state) => [state.getSeo]);

  const getLayout =
    Component.getLayout ??
    ((page) => <DefaultLayout page={Component}>{page}</DefaultLayout>);

  return getLayout(
    <>
      <NextSeo {...getSeo()} />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default App;
