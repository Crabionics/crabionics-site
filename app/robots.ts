import type { MetadataRoute } from "next";

// Keep public /new/ styles, scripts and images crawlable; only direct HTML duplicates are disallowed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up", "/new/index.html", "/new/*/index.html"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up", "/new/index.html", "/new/*/index.html"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up", "/new/index.html", "/new/*/index.html"],
      },
    ],
    sitemap: "https://www.crabionics.com/sitemap.xml",
  };
}
