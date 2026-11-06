import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up", "/new/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up", "/new/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up", "/new/"],
      },
    ],
    sitemap: "https://www.crabionics.com/sitemap.xml",
  };
}
