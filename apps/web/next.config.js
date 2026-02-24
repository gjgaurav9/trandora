/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@trandora/types', '@trandora/config'],
};

module.exports = nextConfig;
