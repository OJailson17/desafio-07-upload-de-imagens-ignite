/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FAUNA_API_KEY: process.env.FAUNA_API_KEY,
  },
};

module.exports = nextConfig;
