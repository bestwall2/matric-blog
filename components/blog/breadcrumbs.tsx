import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] font-medium text-[#555555]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={`${it.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <ChevronLeft className="size-3 opacity-30" />}
            {it.href ? (
              <Link href={it.href} className="transition-colors hover:text-white">
                {it.label}
              </Link>
            ) : (
              <span className="text-[#888888]">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

