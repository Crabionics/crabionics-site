import type { MetadataRoute } from "next";
import { resources, solutions } from "./components/public/site-content";

const baseUrl = "https://crabionics.com";

const publicRoutes = [
  "/",
  "/system",
  "/producers",
  "/validation",
  "/company",
  "/aquaos",
  "/demo",
  "/early-access",
  "/investors",
  "/solutions",
  "/resources",
  ...solutions
    .filter((solution) => solution.slug !== "aquaos")
    .map((solution) => `/solutions/${solution.slug}`),
  ...resources.map((resource) => `/resources/${resource.slug}`),
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    changeFrequency: path.startsWith("/resources") ? "monthly" : "yearly",
    priority:
      path === "/"
        ? 1
        : path === "/system" || path === "/producers" || path === "/validation"
          ? 0.9
          : 0.7,
  }));
}
