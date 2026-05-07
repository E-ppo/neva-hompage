import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/resume/portfolio",
        destination: "/resume/portfolio/index.html",
      },
    ];
  },
};

export default nextConfig;
