import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={`${it.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <ChevronLeft className="size-3 rotate-180 opacity-50" />}
            {it.href ? (
              <Link href={it.href} className="hover:text-white">
                {it.label}
              </Link>
            ) : (
              <span className="text-neutral-300">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
