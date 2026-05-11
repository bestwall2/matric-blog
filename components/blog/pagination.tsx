import Link from "next/link";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  basePath,
  query,
}: {
  page: number;
  totalPages: number;
  basePath: string;
  query: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  function href(p: number) {
    const sp = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const compact: number[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) compact.push(-1);
    compact.push(p);
  });

  return (
    <nav className="flex flex-wrap items-center justify-center gap-3 pt-10">
      <PaginationLink
        disabled={page <= 1}
        href={href(page - 1)}
        label="السابق"
      />
      {compact.map((p, idx) =>
        p === -1 ? (
          <span key={`e-${idx}`} className="px-2 text-[#333333]">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border text-[14px] font-bold transition-all duration-200",
              p === page
                ? "border-[#e63946] bg-[#e63946] text-white shadow-[0_2px_10px_rgba(230,57,70,0.3)]"
                : "border-white/10 bg-[#111111] text-[#888888] hover:border-white/30 hover:text-white"
            )}
          >
            {p}
          </Link>
        )
      )}
      <PaginationLink
        disabled={page >= totalPages}
        href={href(page + 1)}
        label="التالي"
      />
    </nav>
  );
}

function PaginationLink({
  href,
  label,
  disabled,
}: {
  href: string;
  label: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <span className="rounded-full border border-white/5 px-6 py-2 text-[14px] font-bold text-[#333333]">
        {label}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="rounded-full border border-white/10 bg-[#111111] px-6 py-2 text-[14px] font-bold text-white transition-all hover:border-white/30 hover:bg-[#1a1a1a]"
    >
      {label}
    </Link>
  );
}

