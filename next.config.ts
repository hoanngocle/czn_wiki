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
    const cznSections = ["combatant", "partner", "deck-builder", "equipment", "terminology", "patch-note", "mechanics"];
    return [
      ...cznSections.map((section) => ({ source: `/${section}/:path*`, destination: `/czn/${section}/:path*`, permanent: true })),
      { source: "/truyen/:path*", destination: "/ebooks/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
