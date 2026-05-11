export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 antialiased">
      {children}
    </div>
  );
}
