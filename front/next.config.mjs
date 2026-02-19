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
    ];
  },
};

export default nextConfig;
