"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { useState } from "react";

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggleDesktop() {
  const { theme, toggle } = useTheme();
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    toggle();
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      title={theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}
      className="flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)] hover:text-[var(--accent)]"
    >
      <span
        className={cn(
          "flex items-center justify-center transition-all duration-300",
          animating && "rotate-20 opacity-0",
          !animating && "rotate-0 opacity-100"
        )}
        style={animating ? { opacity: 0, transform: "rotate(20deg)" } : { opacity: 1, transform: "rotate(0deg)" }}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}

export function ThemeToggleMobile() {
  const { theme, toggle } = useTheme();

  return (
    <div className="border-t border-white/10">
      <div className="flex h-14 items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <span className="text-white/70">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </span>
          <span className="font-heading text-[15px] font-medium text-white">
            {theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}
          </span>
        </div>
        <button
          onClick={toggle}
          type="button"
          role="switch"
          aria-checked={theme === "light"}
          className={cn(
            "relative h-7 w-[50px] rounded-full transition-colors duration-250",
            theme === "dark" ? "bg-[#333]" : "bg-[#e63946]"
          )}
        >
          <span
            className={cn(
              "absolute left-0.5 top-0.5 size-6 rounded-full bg-white transition-transform duration-250",
              theme === "light" && "translate-x-[22px]"
            )}
          />
        </button>
      </div>
    </div>
  );
}
