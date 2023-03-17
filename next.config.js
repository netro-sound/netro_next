const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import("next").NextConfig} */
module.exports = withPWA({
  /* config options here */
  images: {
    domains: ['netro.devbaraus.ddns.net', 'localhost'],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/v1/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/v1/:path*',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./src/scripts/generate-sitemap');
    }

    return config;
  },
});
