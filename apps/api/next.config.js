/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['openai'],
  },
  async headers() {
    const allowedOrigins = [
      'http://localhost:3002', // Web app dev
      'https://promptly-web.vercel.app' // Web app prod
    ];
    
    return [
      {
        // Apply CORS headers specifically to the /api/rewrite endpoint
        source: '/api/rewrite',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          // Allow specific origins
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Using wildcard for now, refine if needed
          // Uncomment below and comment above for specific origins:
          // {
          //   key: 'Access-Control-Allow-Origin',
          //   value: req.headers.origin && allowedOrigins.includes(req.headers.origin)
          //     ? req.headers.origin
          //     : ''
          // },
          { key: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
}

module.exports = nextConfig 