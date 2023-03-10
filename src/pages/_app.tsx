import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import '@/styles/tailwind.scss';
import { Toaster } from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import useSeoStore from '@/stores/useSeoStore';
import HeaderContainer from '@/components/layouts/HeaderContainer';
import PlayerContainer from '@/components/layouts/PlayerContainer';
import Sidebar from '@/components/layouts/Sidebar';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';

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

  return (
    <>
      <NextSeo {...getSeo()} />
      <Sidebar>
        <HeaderContainer />
        <PlayerContainer />
        <Component {...pageProps} />
      </Sidebar>
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
