import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="scroll-smooth" data-theme="halloween">
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
