import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title")?.slice(0, 120) || "MatricBlog";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0508 45%, #0a0a0a 100%)",
          color: "#f5f5f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#e11d48",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          MatricBlog
        </div>
        <div
          style={{
            fontSize: title.length > 80 ? 48 : 64,
            fontWeight: 700,
            lineHeight: 1.15,
            textWrap: "balance",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 36,
            height: 6,
            width: 140,
            background: "#e11d48",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
