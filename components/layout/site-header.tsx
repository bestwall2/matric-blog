"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";

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
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
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
    <header className="glass fixed top-0 z-50 w-full border-b border-white/5 h-16">
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
                  : "text-[#888888] hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Trigger (Left in RTL) */}
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="hidden rounded-full bg-[#e63946] px-6 py-2 text-[14px] font-bold text-white transition-all hover:bg-[#c1121f] hover:scale-105 active:scale-95 md:inline-block"
          >
            ابدأ القراءة
          </Link>

          {/* Animated Hamburger Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="relative z-[60] flex size-11 items-center justify-center md:hidden"
            aria-label="Toggle Menu"
          >
            <div className="relative flex size-6 flex-col items-center justify-center gap-1.5">
              <span 
                className={cn(
                  "h-0.5 w-6 rounded-full bg-white transition-all duration-300",
                  open && "absolute translate-y-0 rotate-45"
                )} 
              />
              <span 
                className={cn(
                  "h-0.5 w-6 rounded-full bg-white transition-all duration-300",
                  open && "opacity-0"
                )} 
              />
              <span 
                className={cn(
                  "h-0.5 w-6 rounded-full bg-white transition-all duration-300",
                  open && "absolute translate-y-0 -rotate-45"
                )} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-[4px] transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer Content */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[85%] max-w-[320px] bg-gradient-to-b from-[#0f0f0f] to-[#1a0505] shadow-[-20px_0_60px_rgba(0,0,0,0.8)] border-l border-[#e63946]/20 transition-transform duration-[0.35s] cubic-bezier(0.32, 0.72, 0, 1) md:hidden flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="relative flex h-[120px] flex-col justify-center border-b border-white/5 px-8">
          <button
            onClick={() => setOpen(false)}
            className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-[#e63946]/30"
          >
            <X className="size-5" />
          </button>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="size-3 bg-[#e63946]" />
              <span className="font-heading text-2xl font-black text-white">MatricBlog</span>
            </div>
            <span className="text-[13px] text-[#666]">مرحباً بك في MatricBlog</span>
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
                "group relative flex h-16 items-center justify-between border-b border-white/[0.04] px-8 transition-all duration-200",
                pathname === l.href 
                  ? "bg-[#e63946]/10 text-[#e63946] border-r-[3px] border-[#e63946]" 
                  : "text-[#e0e0e0] hover:bg-white/[0.04] hover:text-white",
                open ? `animate-stagger-${index + 1}` : ""
              )}
            >
              <span className="font-heading text-lg font-semibold">{l.label}</span>
              <ArrowLeft className={cn(
                "size-4 text-[#e63946] transition-all duration-300",
                pathname === l.href ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              )} />
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="mt-auto border-t border-white/5 p-8">
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

