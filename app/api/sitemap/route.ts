import { SITE_URL } from "@/lib/constants";
import { createServiceSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createServiceSupabase();
    const now = new Date().toISOString();
    const { data: posts } = await supabase
      .from("posts")
      .select("slug, updated_at, published_at")
      .or(
        `and(status.eq.published,published_at.lte.${now}),and(status.eq.scheduled,scheduled_at.lte.${now})`
      );

    const { data: categories } = await supabase.from("categories").select("slug");

    const urls: { loc: string; lastmod?: string }[] = [
      { loc: `${SITE_URL}/`, lastmod: new Date().toISOString() },
      { loc: `${SITE_URL}/blog`, lastmod: new Date().toISOString() },
      { loc: `${SITE_URL}/about` },
      { loc: `${SITE_URL}/contact` },
      { loc: `${SITE_URL}/privacy` },
      { loc: `${SITE_URL}/terms` },
    ];

    for (const p of posts ?? []) {
      urls.push({
        loc: `${SITE_URL}/blog/${p.slug}`,
        lastmod: (p.updated_at as string) || (p.published_at as string) || undefined,
      });
    }
    for (const c of categories ?? []) {
      urls.push({
        loc: `${SITE_URL}/category/${c.slug}`,
      });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const lm = u.lastmod
      ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>`
      : "";
    return `<url><loc>${escapeXml(u.loc)}</loc>${lm}<changefreq>weekly</changefreq><priority>0.7</priority></url>`;
  })
  .join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("Sitemap error", { status: 500 });
  }
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
