import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: "https://crabionics.com/sitemap.xml",
  };
}
