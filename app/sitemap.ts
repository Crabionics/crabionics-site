import type { MetadataRoute } from "next";

const baseUrl = "https://crabionics.com";

const publicRoutes = [
  "/",
  "/system",
  "/producers",
  "/validation",
  "/company",
  "/aquaos",
  "/investors",
  "/insights",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    changeFrequency: path === "/insights" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path === "/system" || path === "/producers" || path === "/validation" ? 0.9 : 0.7,
  }));
}
