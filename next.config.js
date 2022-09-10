/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imagedelivery.net", "videodelivery.net"],
  },
  // experimental:{
  //   runtime: 'nodejs',
  //   serverComponents: true
  // }
};

module.exports = nextConfig;
