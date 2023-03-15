/** @type {import("next").NextConfig} */
module.exports = {
  /* config options here */
  images: {
    domains: [
      'images.unsplash.com',
      'netro.devbaraus.ddns.net',
      'api.netro.baraus.dev',
      'localhost',
      '127.0.0.1',
    ],
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
};
