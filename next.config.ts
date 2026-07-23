import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Standalone server output — required by the Railway Dockerfile. */
  output: "standalone",

  /**
   * Legacy-URL redirects from the previous site. 301s so search engines
   * transfer old blog/program URLs to the new structure. Sources match
   * with or without a trailing slash.
   */
  async redirects() {
    return [
      {
        source: "/categories/blog",
        destination: "/insights",
        statusCode: 301,
      },
      {
        source: "/categories/blog/",
        destination: "/insights",
        statusCode: 301,
      },
      {
        source: "/blog",
        destination: "/insights",
        statusCode: 301,
      },
      {
        source: "/blog/:slug",
        destination: "/insights",
        statusCode: 301,
      },
      {
        source: "/how-it-works",
        destination: "/accelerator",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
