import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduce extra renders in dev for snappier UX
  reactStrictMode: false,

  // Speed up prod builds by skipping ESLint step
  eslint: { ignoreDuringBuilds: true },

  // Faster builds, avoid image optimization overhead in this setup
  images: { unoptimized: true },

  // Silence mis-detected workspace root warning in this environment
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
