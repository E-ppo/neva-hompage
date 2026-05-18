import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/resume/portfolio",
        destination: "/resume/portfolio/index.html",
      },
      {
        source: "/resume/portfolio-slide",
        destination: "/resume/portfolio-slide/index.html",
      },
    ];
  },
};

export default nextConfig;
