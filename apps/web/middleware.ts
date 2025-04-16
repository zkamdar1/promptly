import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3002', // Development origin
  // Add your production frontend URL here (ideally from an env variable)
  process.env.NEXT_PUBLIC_SITE_URL || 'https://promptly-web.vercel.app' // Fallback hardcoded
];

// This function can be marked 'async' if using await inside
export function middleware(request: NextRequest) {
  // Clone the request headers so we can modify them
  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
        // Pass down the modified headers
        headers: requestHeaders,
    },
  });

  // Check if the request is for an API route and is a CORS-relevant method
  if (request.nextUrl.pathname.startsWith('/api/') && (
      request.method === 'OPTIONS' || request.method === 'POST' // Adjust if other methods are needed
  )) {
    const origin = request.headers.get('origin')

    // Check if the origin is allowed
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
      
      // Handle OPTIONS preflight request
      if (request.method === 'OPTIONS') {
          // Return response with only headers, no body needed for OPTIONS
          return new NextResponse(null, { status: 204, headers: response.headers });
      }
    } else if (origin) {
        // Origin not allowed, but don't leak info. Let the request proceed
        // without CORS headers. The browser will block it on the client-side.
        // Alternatively, you could return an error response here.
        console.warn(`Origin ${origin} not allowed for ${request.nextUrl.pathname}`);
    }
  }

  // Return the response (either modified with CORS headers or the original)
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*', // Apply middleware only to API routes
} 