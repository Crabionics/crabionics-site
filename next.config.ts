import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  async headers() {
    return [
      {source:"/:path*", headers:[
        {key:"X-Content-Type-Options",value:"nosniff"},
        {key:"X-Frame-Options",value:"DENY"},
        {key:"Referrer-Policy",value:"strict-origin"},
      ]},
      // Only the noindex visual review frame can be embedded, by this origin.
      {source: "/design-review/frame", headers:[{key:"X-Frame-Options",value:"SAMEORIGIN"}]},
      {
        source: "/images/versioned/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
