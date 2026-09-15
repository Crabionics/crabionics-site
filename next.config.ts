import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/technology", destination: "/system", permanent: false },
      { source: "/platform", destination: "/system", permanent: false },
      { source: "/why-crab", destination: "/producers", permanent: false },
      { source: "/capital", destination: "/investors", permanent: false },
    ];
  },
};

export default nextConfig;
