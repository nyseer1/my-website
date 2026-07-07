import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Set the root to your project directory [citation:4][citation:12]
    root: path.join(__dirname, '..'),
  },
};

export default nextConfig;
