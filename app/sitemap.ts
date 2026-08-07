import type { MetadataRoute } from "next";
import { getAllInstitutions } from "@/lib/institutions";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const institutions = getAllInstitutions();

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...institutions.map((item) => ({
      url: `${SITE.url}/${item.type}/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
