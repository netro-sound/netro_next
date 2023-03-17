import { Head, Html, Main, NextScript } from 'next/document';
import siteConfig from '../site.config';

export default function Document() {
  return (
    <Html data-theme="bumblebee" lang="pt-BR">
      <Head>
        <meta name="application-name" content={siteConfig.title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.title} />
        <meta name="description" content={siteConfig.description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="manifest" href="manifest.json" />
        <meta name="theme-color" content="#E0A82E" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
