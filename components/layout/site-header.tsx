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
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-heading text-xl font-semibold tracking-tight text-white md:text-2xl">
              Matric<span className="text-[#e11d48]">Blog</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium text-neutral-400 transition hover:text-white",
                  pathname === l.href && "text-[#e11d48]"
                )}
              >
                {dir === "rtl" ? l.label : l.labelEn}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="hidden border-white/15 bg-white/5 text-neutral-200 hover:bg-white/10 md:inline-flex"
              onClick={() => setDir(dir === "rtl" ? "ltr" : "rtl")}
            >
              <Languages className="mr-2 size-4" />
              {dir === "rtl" ? "English" : "العربية"}
            </Button>

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
                className="border-white/10 bg-[#0a0a0a] text-white"
              >
                <SheetHeader>
                  <SheetTitle className="font-heading text-left text-white">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-lg text-neutral-300",
                        pathname === l.href && "text-[#e11d48]"
                      )}
                    >
                      {dir === "rtl" ? l.label : l.labelEn}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    className="mt-4 border-white/15"
                    onClick={() => setDir(dir === "rtl" ? "ltr" : "rtl")}
                  >
                    <Languages className="mr-2 size-4" />
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
