import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up", "/digital-model", "/design-review", "/early-access/confirm", "/early-access/review", "/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up", "/digital-model", "/design-review", "/early-access/confirm", "/early-access/review", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/control-tower", "/sign-in", "/sign-up", "/digital-model", "/design-review", "/early-access/confirm", "/early-access/review", "/api/"],
      },
    ],
    sitemap: "https://www.crabionics.com/sitemap.xml",
  };
}
