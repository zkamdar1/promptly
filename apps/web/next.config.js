/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: 'standalone', // Not needed for combined app

  // CORS headers removed - will be handled by middleware
}

module.exports = nextConfig 