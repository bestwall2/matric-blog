"use client";

import { Button } from "@/components/ui/button";
import { Copy, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";

export function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="border-white/15 bg-white/5 text-neutral-200 hover:bg-white/10"
        asChild
      >
        <a
          href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          X / Twitter
        </a>
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="border-white/15 bg-white/5 text-neutral-200 hover:bg-white/10"
        asChild
      >
        <a
          href={`https://wa.me/?text=${text}%20${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="mr-1 size-4" />
          WhatsApp
        </a>
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="border-white/15 bg-white/5 text-neutral-200 hover:bg-white/10"
        asChild
      >
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Share2 className="mr-1 size-4" />
          Facebook
        </a>
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="border-white/15 bg-white/5 text-neutral-200 hover:bg-white/10"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            toast.success("تم نسخ الرابط");
          } catch {
            toast.error("تعذّر النسخ");
          }
        }}
      >
        <Copy className="mr-1 size-4" />
        نسخ الرابط
      </Button>
    </div>
  );
}
