export const SITE_NAME = "MatricBlog";
export const SITE_DESCRIPTION =
  "دليلك للبث الرياضي، كرة القدم، والتقنية — محتوى موثوق للقارئ العربي في المغرب ومنطقة الشرق الأوسط وشمال أفريقيا.";
export const SITE_DESCRIPTION_EN =
  "Sports streaming, football, and tech guides for Arabic readers in Morocco and MENA.";

function normalizeSiteUrl(input: string | undefined): string {
  const raw = (input ?? "").trim().replace(/\/$/, "");
  if (!raw) return "http://localhost:3000";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  // Vercel envs are often set as domain only; assume https in production.
  return `https://${raw}`;
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const DEFAULT_OG = `${SITE_URL}/og-default.png`;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
