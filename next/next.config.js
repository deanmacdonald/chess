/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  compiler: {},
  experimental: {
    forceSwcTransforms: false
  }
};

module.exports = nextConfig;
