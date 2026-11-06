import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  // The new-look pages are static files in public/new/ (exported from the crabionics-website design repo).
  // Serve them at the normal addresses before the old app pages. The API, staff area, sign-in, the
  // email-confirmation API and the old forwarding addresses (/capital, /about …) are untouched.
  async rewrites() {
    const page = (path: string) => ({ source: path, destination: `/new${path === "/" ? "" : path}/index.html` });
    return {
      beforeFiles: [
        page("/"),
        ...["/system", "/solutions", "/aquaos", "/producers", "/validation", "/resources", "/company",
          "/contact", "/demo", "/early-access", "/early-access/confirm", "/investors", "/privacy", "/terms",
          "/solutions/habitat", "/solutions/crabsense", "/solutions/crabpod",
          "/resources/mud-crab-farm-records", "/resources/planning-a-production-pilot",
          "/resources/understanding-the-operating-loop", "/resources/defining-finishing-intake"].map(page),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {source:"/:path*", headers:[
        {key:"X-Content-Type-Options",value:"nosniff"},
        {key:"X-Frame-Options",value:"DENY"},
        {key:"Referrer-Policy",value:"strict-origin"},
      ]},
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
