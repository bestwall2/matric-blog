"use client";

import { MessageCircle, Share2, Copy, Send } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-wrap gap-4">
      <ShareCircle
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        icon={<Send className="size-5" />}
        label="X"
      />
      <ShareCircle
        href={`https://wa.me/?text=${text}%20${encoded}`}
        icon={<MessageCircle className="size-5" />}
        label="WhatsApp"
        color="hover:bg-emerald-600"
      />
      <ShareCircle
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        icon={<Share2 className="size-5" />}
        label="Facebook"
        color="hover:bg-blue-700"
      />
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            toast.success("تم نسخ الرابط");
          } catch {
            toast.error("تعذّر النسخ");
          }
        }}
        className={cn(
          "flex size-12 items-center justify-center rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] transition-all hover:bg-[var(--bg-elevated)] hover:scale-110 active:scale-95"
        )}
        title="نسخ الرابط"
      >
        <Copy className="size-5" />
      </button>
    </div>
  );
}

function ShareCircle({
  href,
  icon,
  label,
  color = "hover:bg-[#e63946]",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  color?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex size-12 items-center justify-center rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] transition-all hover:scale-110 active:scale-95",
        color
      )}
      title={label}
    >
      {icon}
    </a>
  );
}


