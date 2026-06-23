import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminLogout } from "./actions";
import { LayoutDashboard, ShoppingCart, Package, Users, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_session');

  if (!isAdmin) {
    redirect('/admin-login');
  }

  return (
    // FIX 1: pt-16 md:pt-20 pushes this whole layout safely below your fixed global NavBar
    <div className="pt-16 md:pt-20 flex-1 w-full bg-[#020202] text-white flex font-sans">
      
      {/* FIX 2: Made sidebar sticky and calculated its height to perfectly fit between NavBar and Footer */}
      <aside className="w-64 bg-zinc-950 border-r border-white/10 flex-col hidden lg:flex shrink-0 sticky top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        <div className="p-6 border-b border-white/10 shrink-0">
          <h1 className="font-black italic uppercase tracking-tighter text-2xl leading-none text-white">
            WEAR<br />WHATEVER
            <span className="block text-[#f0c808] text-[10px] font-mono tracking-widest mt-1 not-italic">
              Command Center
            </span>
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs uppercase tracking-widest">
          <Link href="/admin" className="flex items-center gap-3 p-3 text-zinc-400 hover:text-black hover:bg-[#f0c808] transition-all">
            <LayoutDashboard className="w-4 h-4" /> Overview
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 text-zinc-400 hover:text-black hover:bg-[#f0c808] transition-all">
            <ShoppingCart className="w-4 h-4" /> All Orders
          </Link>
          <Link href="/admin/inventory" className="flex items-center gap-3 p-3 text-zinc-400 hover:text-black hover:bg-[#f0c808] transition-all">
            <Package className="w-4 h-4" /> Inventory
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 p-3 text-zinc-400 hover:text-black hover:bg-[#f0c808] transition-all">
            <Users className="w-4 h-4" /> Customers
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <form action={adminLogout}>
            <button type="submit" className="w-full flex items-center gap-3 p-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors font-mono text-xs uppercase tracking-widest">
              <LogOut className="w-4 h-4" /> Terminate Session
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative">
        
        {/* Mobile secondary header */}
        <header className="lg:hidden h-16 bg-zinc-950 border-b border-white/10 flex items-center justify-between px-6 shrink-0 sticky top-16 z-20">
          <h1 className="font-black italic uppercase tracking-tighter text-lg text-white">Command Center</h1>
          <form action={adminLogout}>
             <button type="submit" className="text-red-500"><LogOut className="w-5 h-5"/></button>
          </form>
        </header>

        {/* FIX 3: Removed internal overflow so the page scrolls naturally and reveals your global Footer */}
        <main className="flex-1 p-4 md:p-10 w-full relative z-10 bg-[#020202]">
          {children}
        </main>
      </div>
    </div>
  );
}