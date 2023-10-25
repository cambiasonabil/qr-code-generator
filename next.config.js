/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/qrcode',
        destination: '/qrCode', // Replace with the actual page path
      },
    ];
  },
}

module.exports = nextConfig
