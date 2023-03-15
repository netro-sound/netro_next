import { Head, Html, Main, NextScript } from 'next/document';
import { classNames } from '../utils';
import useTheme from '../hooks/useTheme';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
