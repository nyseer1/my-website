import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: process.cwd(), // Ensures it uses the current project root
  }
};

export default nextConfig;
