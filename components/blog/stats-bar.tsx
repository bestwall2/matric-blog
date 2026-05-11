export function StatsBar({
  articles,
  categories,
  views,
}: {
  articles: number;
  categories: number;
  views: number;
}) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("ar-MA", { notation: "compact" }).format(n);

  const items = [
    { label: "مقالات منشورة", value: fmt(articles) },
    { label: "تصنيفات", value: fmt(categories) },
    { label: "مشاهدات تقريبية", value: fmt(views) },
  ];

  return (
    <div className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 md:grid-cols-3">
      {items.map((it) => (
        <div key={it.label} className="text-center md:text-start">
          <p className="font-heading text-3xl text-[var(--text-primary)]">{it.value}</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-[var(--text-muted)]">
            {it.label}
          </p>
        </div>
      ))}
    </div>
  );
}
