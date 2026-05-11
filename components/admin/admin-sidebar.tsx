"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Newspaper,
  Sparkles,
  FolderTree,
  Settings,
  Search,
  LogOut,
  ExternalLink,
} from "lucide-react";

const items = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/posts", label: "المقالات", icon: Newspaper },
  { href: "/admin/ai-generate", label: "توليد بالذكاء الاصطناعي", icon: Sparkles },
  { href: "/admin/seo", label: "أدوات SEO", icon: Search },
  { href: "/admin/categories", label: "التصنيفات", icon: FolderTree },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#0a0a0a] px-4 py-8 md:flex">
      <Link href="/admin" className="px-2 font-heading text-xl text-white">
        Matric<span className="text-[#e11d48]">Admin</span>
      </Link>
      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin" ?
              pathname === "/admin"
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                active ?
                  "bg-[#e11d48]/15 text-white"
                : "text-neutral-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-white/10 pt-4">
        <Button
          variant="outline"
          className="w-full justify-start border-white/15 bg-transparent text-neutral-200 hover:bg-white/10"
          asChild
        >
          <Link href="/" target="_blank">
            <ExternalLink className="ml-2 size-4" />
            عرض الموقع
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-neutral-400 hover:text-white"
          onClick={() => void logout()}
        >
          <LogOut className="ml-2 size-4" />
          خروج
        </Button>
      </div>
    </aside>
  );
}
