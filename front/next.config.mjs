/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',

  async rewrites() {
    const apiHost = process.env.NEXT_PUBLIC_API_PROXY_TARGET || 'http://localhost:8080';

    return [
      {
        source: '/api/:path*',
        destination: `${apiHost}/:path*`,
      },
      // Proxy WebSocket in dev (Next.js dev server supports WS upgrade through rewrites)
      {
        source: '/ws',
        destination: `${apiHost}/ws`,
      },
      {
        source: '/ws/:path*',
        destination: `${apiHost}/ws/:path*`,
      },
    ];
  },
};

export default nextConfig;
