import type { MetadataRoute } from "next";
import { resources, solutions } from "./components/public/site-content";

const baseUrl = "https://www.crabionics.com";

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
  // Only report a last-modified timestamp for routes actually updated in this release.
  // Replacing every URL's date on every build would mislead crawlers.
  const updated = new Set(["/", "/aquaos", "/demo", "/resources", "/resources/mud-crab-farm-records"]);
  return publicRoutes.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    ...(updated.has(path) ? { lastModified: new Date("2026-10-21T00:00:00+05:30") } : {}),
    changeFrequency: path.startsWith("/resources") ? "monthly" : "yearly",
    priority:
      path === "/"
        ? 1
        : ["/system", "/producers", "/validation", "/aquaos"].includes(path)
          ? 0.9
          : 0.7,
  }));
}
