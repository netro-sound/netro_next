import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import type { NextPage } from 'next';
import '@/styles/tailwind.scss';
import { Toaster } from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import useSeoStore from '@/stores/useSeoStore';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { useAuthStore } from '@/stores/useAuthStore';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  permissions?: number[];
  overrideLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [user, checkAuth] = useAuthStore((state) => [
    state.user,
    state.checkAuth,
  ]);
  const [getSeo] = useSeoStore((state) => [state.getSeo]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      <NextSeo {...getSeo()} />
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
    </>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        session: req.session,
      },
    };
  },
  sessionOptions
);

export default App;
