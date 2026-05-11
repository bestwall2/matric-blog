"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Languages, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { DirBridge } from "@/components/layout/dir-bridge";

const links = [
  { href: "/", label: "الرئيسية", labelEn: "Home" },
  { href: "/blog", label: "المقالات", labelEn: "Articles" },
  { href: "/about", label: "من نحن", labelEn: "About" },
  { href: "/contact", label: "اتصل بنا", labelEn: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [dir, setDir] = useState<"rtl" | "ltr">("rtl");
  const [open, setOpen] = useState(false);

  return (
    <>
      <DirBridge dir={dir} />
      <header className="glass glass-border fixed top-0 z-50 w-full">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
              Matric<span className="text-[#e63946]">Blog</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white",
                  "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#e63946] after:transition-all after:duration-300 hover:after:w-4/5",
                  pathname === l.href && "text-[#e63946] after:w-4/5"
                )}
              >
                {dir === "rtl" ? l.label : l.labelEn}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hidden border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 md:inline-flex"
              onClick={() => setDir(dir === "rtl" ? "ltr" : "rtl")}
            >
              <Languages className="ml-2 size-4" />
              {dir === "rtl" ? "English" : "العربية"}
            </Button>

            <Link
              href="/blog"
              className="hidden rounded-full bg-[#e63946] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#c1121f] md:inline-block"
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
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent
                side={dir === "rtl" ? "right" : "left"}
                className="border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl text-white"
              >
                <SheetHeader>
                  <SheetTitle className="font-heading text-left text-white">
                    القائمة
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-lg font-medium text-neutral-300 transition-colors hover:text-white",
                        pathname === l.href && "text-[#e63946]"
                      )}
                    >
                      {dir === "rtl" ? l.label : l.labelEn}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    className="mt-4 border-white/15 text-white"
                    onClick={() => setDir(dir === "rtl" ? "ltr" : "rtl")}
                  >
                    <Languages className="ml-2 size-4" />
                    {dir === "rtl" ? "English" : "العربية"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
