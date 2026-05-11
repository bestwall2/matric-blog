"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const el =
      document.scrollingElement ||
      document.documentElement ||
      document.body;

    function onScroll() {
      const scrollTop = el.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      const next = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0;
      setP(next);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-[#e11d48] transition-[width] duration-150 ease-out"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
