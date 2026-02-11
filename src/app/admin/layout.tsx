export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10 p-6 flex justify-between items-center bg-zinc-950">
        <h1 className="font-black italic uppercase tracking-tighter text-xl">
          WearWhatever <span className="text-purple-500">Command Center</span>
        </h1>
      </nav>
      <div className="p-8">{children}</div>
    </div>
  );
}