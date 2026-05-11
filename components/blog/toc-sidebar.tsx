"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; text: string; level: number };

export function TocSidebar() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const run = () => {
      const root = document.querySelector(".article-html");
      if (!root) {
        setItems([]);
        return;
      }
      const headings = Array.from(root.querySelectorAll("h2, h3"));
      const built: TocItem[] = [];

      headings.forEach((el, idx) => {
        const text = el.textContent?.trim();
        if (!text) return;
        const raw = text
          .toLowerCase()
          .replace(/[^\w\u0600-\u06FF\s-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 48);
        const id = `${raw || "section"}-${idx}`;
        el.id = id;
        built.push({
          id,
          text,
          level: el.tagName === "H2" ? 2 : 3,
        });
      });

      setItems(built);
    };

    const h = window.requestAnimationFrame(run);
    return () => cancelAnimationFrame(h);
  }, [pathname]);

  useEffect(() => {
    if (!items.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const top = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
          if (top.target.id) setActive(top.target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 1] }
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <div className="rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] p-5">
      <p className="font-heading text-[14px] font-bold text-[var(--text-primary)] mb-4">
        محتويات المقال
      </p>
      <nav className="space-y-3 text-[14px]">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={cn(
              "block transition-all duration-200",
              it.level === 3 ? "pr-4 text-[13px]" : "font-medium",
              active === it.id 
                ? "text-[#e63946] pr-2 border-r-2 border-[#e63946]" 
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] pr-2 border-r-2 border-transparent"
            )}
          >
            {it.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

