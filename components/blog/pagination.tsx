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
    <nav className="flex flex-wrap items-center justify-center gap-2 pt-10">
      <PaginationLink
        disabled={page <= 1}
        href={href(page - 1)}
        label="السابق"
      />
      {compact.map((p, idx) =>
        p === -1 ? (
          <span key={`e-${idx}`} className="px-2 text-neutral-600">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border text-sm transition",
              p === page
                ? "border-[#e11d48] bg-[#e11d48] text-white"
                : "border-white/10 bg-[#141414] text-neutral-300 hover:border-[#e11d48]/50"
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
      <span className="rounded-full border border-white/5 px-4 py-2 text-sm text-neutral-600">
        {label}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="rounded-full border border-white/15 bg-[#141414] px-4 py-2 text-sm text-neutral-200 hover:border-[#e11d48]/40"
    >
      {label}
    </Link>
  );
}
