"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import { ThemeToggleDesktop, ThemeToggleMobile } from "@/components/theme/theme-toggle";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/blog", label: "المقالات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header className="glass fixed top-0 z-[200] w-full border-b border-[var(--border)] h-16">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo (Right in RTL) */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="size-3 bg-[#e63946] transition-transform group-hover:rotate-45" />
          <span className="font-heading text-xl font-black tracking-tight text-white md:text-2xl">
            MatricBlog
          </span>
        </Link>

        {/* Nav Links (Middle - Desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-[15px] font-medium transition-all duration-300",
                pathname === l.href
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA, Theme Toggle & Mobile Trigger (Left in RTL) */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggleDesktop />
          </div>
          <Link
            href="/blog"
            className="hidden rounded-full bg-[#e63946] px-6 py-2 text-[14px] font-bold text-white transition-all hover:bg-[#c1121f] hover:scale-105 active:scale-95 md:inline-block"
          >
            ابدأ القراءة
          </Link>

          {/* Hamburger Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="relative z-[70] flex size-11 items-center justify-center md:hidden"
            aria-label="Toggle Menu"
            aria-expanded={open}
          >
            <div className="relative flex size-6 flex-col items-center justify-center gap-1.5">
              <span 
                className="h-0.5 w-6 rounded-full bg-white transition-all duration-300"
              />
              <span 
                className="h-0.5 w-6 rounded-full bg-white transition-all duration-300"
              />
              <span 
                className="h-0.5 w-6 rounded-full bg-white transition-all duration-300"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-[80] bg-[var(--overlay)] backdrop-blur-[4px] transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer Content */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 z-[90] w-[85%] max-w-[320px] shadow-[var(--shadow-card)] border-l border-white/10 transition-transform duration-[0.35s] cubic-bezier(0.32, 0.72, 0, 1) md:hidden flex flex-col bg-[var(--drawer-bg)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="relative flex h-[120px] flex-col justify-center border-b border-white/10 px-8">
          <button
            onClick={() => setOpen(false)}
            className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full bg-[#1a1a1a] text-white transition-all hover:bg-[#2a2a2a]"
            aria-label="Close Menu"
          >
            <X className="size-5" />
          </button>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="size-3 bg-[#e63946]" />
              <span className="font-heading text-2xl font-black text-white">MatricBlog</span>
            </div>
            <span className="text-[13px] text-white/50">مرحباً بك في MatricBlog</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col py-2">
          {links.map((l, index) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "group relative flex h-16 items-center justify-between border-b border-[var(--border)] px-8 transition-all duration-200",
                pathname === l.href
                  ? "bg-[var(--accent)]/10 text-[var(--accent)] border-r-[3px] border-[var(--accent)]"
                  : "text-white hover:bg-white/10 hover:text-white",
                open ? `animate-stagger-${index + 1}` : ""
              )}
            >
              <span className="font-heading text-lg font-semibold">{l.label}</span>
              <ArrowLeft className={cn(
                "size-4 text-[var(--accent)] transition-all duration-300",
                pathname === l.href ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              )} />
            </Link>
          ))}
        </nav>

        {/* Mobile Theme Toggle */}
        <div className="mt-auto">
          <ThemeToggleMobile />
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-white/10 p-8">
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-[#e63946] font-heading text-[16px] font-bold text-white shadow-[0_4px_20px_rgba(230,57,70,0.4)] transition-all hover:bg-[#c1121f] hover:scale-[0.98] active:scale-95"
          >
            ابدأ القراءة
          </Link>
        </div>
      </div>
    </header>
  );
}
