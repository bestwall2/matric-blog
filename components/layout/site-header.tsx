"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/blog", label: "المقالات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

        {/* Nav Links (Middle) */}
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

        {/* CTA (Left in RTL) */}
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="hidden rounded-full bg-[#e63946] px-6 py-2 text-[14px] font-bold text-white transition-all hover:bg-[#c1121f] hover:scale-105 active:scale-95 md:inline-block"
          >
            ابدأ القراءة
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "text-white md:hidden"
              )}
              aria-label="Menu"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-white/5 bg-[#0a0a0a]/95 backdrop-blur-2xl text-white pt-16"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>القائمة</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-2xl font-bold transition-colors",
                      pathname === l.href ? "text-[#e63946]" : "text-neutral-400"
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/blog"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-xl bg-[#e63946] py-4 text-center text-lg font-bold"
                >
                  ابدأ القراءة
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

