import { stripHtml } from "@/lib/seo";

export type SeoScoreBreakdown = {
  label: string;
  ok: boolean;
  weight: number;
};

/** Simple reading ease for Latin scripts (0–100 scale heuristic). */
export function readingEaseScore(text: string): number {
  const s = text.trim();
  if (!s) return 0;
  const sentences = s.split(/[.!?]+/).filter(Boolean).length || 1;
  const words = s.split(/\s+/).filter(Boolean).length || 1;
  const syllables = words * 1.4;
  const score =
    206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function computeSeoScore(params: {
  title: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  htmlContent: string;
  featuredImage?: string | null;
}): { score: number; breakdown: SeoScoreBreakdown[] } {
  const plain = stripHtml(params.htmlContent);
  const words = plain.split(/\s+/).filter(Boolean);
  const kw = params.focusKeyword.trim().toLowerCase();
  const titleLc = params.title.toLowerCase();
  const firstPara = plain.split(/\n+/)[0]?.toLowerCase() ?? "";

  const internalLinks = (params.htmlContent.match(/href="\//g) || []).length;

  const imgAlts =
    (params.htmlContent.match(/<img[^>]+alt=["']([^"']+)["']/gi) || []).filter(
      (m) => !/alt=["']\s*["']/i.test(m)
    ).length;
  const imgs = (params.htmlContent.match(/<img\b/gi) || []).length;
  const imgOk = imgs === 0 || imgAlts >= Math.min(imgs, 1);

  const breakdown: SeoScoreBreakdown[] = [
    {
      label: "Meta title length (~60)",
      ok: params.metaTitle.length >= 30 && params.metaTitle.length <= 60,
      weight: 12,
    },
    {
      label: "Meta description (~150–160)",
      ok:
        params.metaDescription.length >= 120 &&
        params.metaDescription.length <= 165,
      weight: 12,
    },
    {
      label: "Keyword in title",
      ok: !kw || titleLc.includes(kw),
      weight: 14,
    },
    {
      label: "Keyword in first paragraph",
      ok: !kw || firstPara.includes(kw),
      weight: 14,
    },
    {
      label: "Featured / content images have alt",
      ok: imgOk,
      weight: 10,
    },
    {
      label: "Internal links (≥2)",
      ok: internalLinks >= 2,
      weight: 12,
    },
    {
      label: "Word count (>600)",
      ok: words.length > 600,
      weight: 14,
    },
    {
      label: "Reading ease (Latin)",
      ok: readingEaseScore(plain) >= 35,
      weight: 12,
    },
  ];

  const max = breakdown.reduce((a, b) => a + b.weight, 0);
  const earned = breakdown.reduce((a, b) => a + (b.ok ? b.weight : 0), 0);
  const score = Math.round((earned / max) * 100);
  return { score, breakdown };
}
