import { ReactNode } from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';

type Props = {
  children: ReactNode;
  page: NextPageWithLayout;
};
const DefaultLayout = ({ children, page }: Props) => {
  return (
    <>
      <Head>
        <title>Netro Sound</title>
        <meta name="description" content="Netro Sound" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex items-center justify-center min-h-screen">
        {children}
      </main>
    </>
  );
};

export default DefaultLayout;
