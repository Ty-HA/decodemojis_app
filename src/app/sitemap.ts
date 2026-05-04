import type { MetadataRoute } from "next";
import { getAllEmojis, encodeEmojiForUrl } from "@/utils/emoji-utils";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://decodemojis.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/glossaire`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/glossaire-alphabetique`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/glossaire-argot`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/glossaire-argot-categories`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/search`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/proposer`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cgu`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  try {
    const emojis = await getAllEmojis();
    const emojiRoutes: MetadataRoute.Sitemap = emojis.map((e) => ({
      url: `${SITE_URL}/emoji/${encodeEmojiForUrl(e.emoji)}`,
      lastModified: e.date_ajout ? new Date(e.date_ajout) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
    return [...staticRoutes, ...emojiRoutes];
  } catch {
    return staticRoutes;
  }
}
