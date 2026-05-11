import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase/server";

const schema = z.object({ slug: z.string().min(1) });

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    const supabase = await createServerSupabase();
    const { error } = await supabase.rpc("increment_post_views", {
      post_slug: parsed.data.slug,
    });
    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Could not increment" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
