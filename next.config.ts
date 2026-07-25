import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone server output — consumed by the Dockerfile / Railway deploy.
  output: "standalone",
};

export default nextConfig;
