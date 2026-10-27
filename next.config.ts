import type { NextConfig } from "next";

const projectId = process.env.SANITY_API_PROJECT_ID;
const dataset = process.env.SANITY_API_DATASET;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `https://cdn.sanity.io/images/${projectId}/${dataset}/:path*`,
      },
      {
        source: "/files/:path*",
        destination: `https://cdn.sanity.io/files/${projectId}/${dataset}/:path*`,
      },
    ];
  },
};

export default nextConfig;
