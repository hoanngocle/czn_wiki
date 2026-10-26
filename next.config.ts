import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [{ source: "/czn/:path*", destination: "/:path*", permanent: true }];
  },
};

export default nextConfig;
