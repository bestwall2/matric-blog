"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 640);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      className="fixed bottom-8 left-8 z-50 flex size-12 items-center justify-center rounded-full bg-[#e63946] text-white shadow-[0_4px_20px_rgba(230,57,70,0.4)] transition-all hover:scale-110 active:scale-95 animate-fade-in"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <ArrowUp className="size-6" />
    </button>
  );
}

