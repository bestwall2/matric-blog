import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";
import { getIsAdmin } from "@/lib/auth";
import { callGeminiJson, parseJsonLoose } from "@/lib/gemini";

const bodySchema = z.object({
  topic: z.string().min(3),
  language: z.enum(["Arabic", "English", "Both"]),
  type: z.enum(["Guide", "News", "Review", "Comparison", "HowTo"]),
  length: z.enum(["short", "medium", "long"]),
  tone: z.enum(["Educational", "Conversational", "Technical", "Journalistic"]),
  keyword: z.string().min(2),
  includeFAQ: z.boolean(),
  includeTOC: z.boolean(),
  instructions: z.string().optional(),
  categoryId: z.string().uuid().optional(),
});

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabase();
    if (!(await getIsAdmin(supabase))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      topic,
      language,
      type,
      length,
      tone,
      keyword,
      includeFAQ,
      includeTOC,
      instructions,
    } = parsed.data;

    const wordCount = { short: 500, medium: 1000, long: 2000 }[length];

    const systemPrompt = `You are an expert blog writer and SEO specialist. You write high-quality, 
Google AdSense-approved content. Your content is:
- 100% original and human-like
- Well-structured with proper H2/H3 headings
- SEO-optimized with natural keyword usage (not keyword stuffing)
- Informative, accurate, and valuable to readers
- Free of any content that violates Google policies
- Written in a ${tone} tone
You return ONLY valid JSON, no markdown fences, no preamble.`;

    const userPrompt = `Write a complete blog article about: "${topic}"

Requirements:
- Language: ${language}
- Article type: ${type}
- Target word count: approximately ${wordCount} words
- Focus keyword: "${keyword}"
- ${includeFAQ ? "Include a FAQ section at the end with 5 Q&A pairs (use h2 for FAQ and h3 for each question)." : ""}
- ${includeTOC ? "Start with a nav titled 'Table of contents' listing anchor links to each h2 section." : ""}
- ${instructions ? `Additional instructions: ${instructions}` : ""}

Return a JSON object with this exact structure:
{
  "title": "SEO-optimized article title (max 60 chars)",
  "title_ar": "Arabic version of title if language is Arabic or Both, else empty string",
  "slug": "url-friendly-slug-latin",
  "excerpt": "Compelling meta description (150-160 chars)",
  "content": "Full HTML article content with proper h2/h3 tags, paragraphs, lists",
  "content_ar": "Arabic HTML content if language is Arabic or Both, else empty string",
  "meta_title": "SEO meta title",
  "meta_description": "SEO meta description (150-160 chars)",
  "meta_keywords": ["keyword1", "keyword2", "keyword3"],
  "structured_data": { "@context": "https://schema.org", "@type": "Article" },
  "reading_time": 5,
  "seo_score": 85,
  "seo_notes": ["List of SEO improvements made"]
}`;

    const raw = await callGeminiJson({
      system: systemPrompt,
      user: userPrompt,
      maxOutputTokens: 4096,
    });

    const data = parseJsonLoose<Record<string, unknown>>(raw);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
