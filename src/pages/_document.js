import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const siteSettings = {
    title: 'PWA App',
    description: 'Best PWA App in the world',
    url: 'https://pwa-app.com',
    image: 'https://pwa-app.com/og-image.png',
  };

  return (
    <Html data-theme="bumblebee" lang="pt-BR">
      <Head>
        <meta name="application-name" content={siteSettings.title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteSettings.title} />
        <meta name="description" content={siteSettings.description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="manifest" href="/manifest.json" />
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
