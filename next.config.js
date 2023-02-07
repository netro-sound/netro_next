/** @type {import("next").NextConfig} */
module.exports = {
  /* config options here */
  images: {
    domains: [
      'images.unsplash.com',
      '127.0.0.1',
      'devbaraus.200.17.57.29.nip.io',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_SSR_API_URL}/v1/:path*`,
      },
    ];
  },
};
