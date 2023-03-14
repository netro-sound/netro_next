import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import type { NextPage } from 'next';
import '@/styles/tailwind.scss';
import { Toaster } from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import useSeoStore from '@/stores/useSeoStore';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { useAuthStore } from '@/stores/useAuthStore';
import useSession from '@/hooks/useSession';
import { toastError, toastSuccess, toastWarning } from '@/lib/toasts';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  permissions?: number[];
  overrideLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [user, update] = useAuthStore((state) => [state.user, state.update]);
  const [getSeo] = useSeoStore((state) => [state.getSeo]);
  const router = useRouter();

  function handleSessionFlash({
    type,
    message,
  }: {
    type: string;
    message: string;
  }) {
    const toasts = {
      success: () => toastSuccess(message),
      warning: () => toastWarning(message),
      error: () => toastError(message),
    };

    // @ts-ignore
    toasts[type]();
  }

  useEffect(() => {
    useSession().then(({ auth, flash }) => {
      update(auth);
      if (!isEmpty(flash)) {
        handleSessionFlash(flash);
      }
    });
  }, [router.pathname]);

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <>
      <NextSeo {...getSeo()} />
      {/*<Transition*/}
      {/*  show={Boolean(user)}*/}
      {/*  enter="transition-opacity duration-300"*/}
      {/*  enterFrom="opacity-0"*/}
      {/*  enterTo="opacity-100"*/}
      {/*  leave="transition-opacity duration-300"*/}
      {/*  leaveFrom="opacity-100"*/}
      {/*  leaveTo="opacity-0"*/}
      {/*>*/}
      {getLayout(<Component {...pageProps} />)}
      {/*</Transition>*/}
      <Toaster />
    </>
  );
};

export default App;
