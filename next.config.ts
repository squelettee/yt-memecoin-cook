import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://memecook.fun/api/:path*',
      },
    ];
  },
};

export default nextConfig;
