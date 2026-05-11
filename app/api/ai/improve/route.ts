import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";
import { getIsAdmin } from "@/lib/auth";
import { callClaudeJson, parseJsonLoose } from "@/lib/claude";

const bodySchema = z.object({
  html: z.string().min(20),
  focusKeyword: z.string().optional(),
  instruction: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabase();
    if (!(await getIsAdmin(supabase))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { html, focusKeyword, instruction } = parsed.data;

    const system = `You refine HTML blog content for SEO and readability while staying AdSense-safe.
Return ONLY valid JSON with keys: "content" (improved full HTML), "seo_notes" (string array). No markdown.`;

    const user = `Improve this HTML article.

${focusKeyword ? `Focus keyword: ${focusKeyword}` : ""}
${instruction ? `Editor notes: ${instruction}` : ""}

HTML:
${html.slice(0, 120_000)}`;

    const raw = await callClaudeJson({
      system,
      user,
      maxTokens: 8192,
    });
    const data = parseJsonLoose<{ content: string; seo_notes: string[] }>(raw);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Improve failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
