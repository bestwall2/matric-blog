export const SITE_NAME = "MatricBlog";
export const SITE_DESCRIPTION =
  "دليلك للبث الرياضي، كرة القدم، والتقنية — محتوى موثوق للقارئ العربي في المغرب ومنطقة الشرق الأوسط وشمال أفريقيا.";
export const SITE_DESCRIPTION_EN =
  "Sports streaming, football, and tech guides for Arabic readers in Morocco and MENA.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";
export const DEFAULT_OG = `${SITE_URL}/og-default.png`;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
