import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { getIsAdmin } from "@/lib/auth";
import { createServiceSupabase } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabase();
    if (!(await getIsAdmin(supabase))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop()?.replace(/[^\w]/g, "") || "jpg";
    const path = `featured/${crypto.randomUUID()}.${ext}`;

    const admin = createServiceSupabase();
    const { data, error } = await admin.storage
      .from("featured")
      .upload(path, buf, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = admin.storage.from("featured").getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl, path: data.path });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
