import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/bg3progression",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
};

export default nextConfig;
