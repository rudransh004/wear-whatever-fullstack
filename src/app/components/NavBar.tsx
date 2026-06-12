"use client";

import { useCart } from "../../lib/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

export default function NavBar() {
  const { openCart, items } = useCart();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter text-white">
          WEAR <span className="text-zinc-500 italic">WHATEVER</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-[10px] font-mono uppercase text-zinc-400 hover:text-white transition-colors">
            Shop
          </Link>

          {/* --- NEW STUDIO LINK --- */}
          <Link href="/studio" className="text-[10px] font-mono uppercase text-zinc-400 hover:text-white transition-colors">
            Studio
          </Link>
          
          <Link href="/about" className="text-[10px] font-mono uppercase text-zinc-400 hover:text-white transition-colors">
            About
          </Link>

          <Link href="/orders" className="text-[10px] font-mono uppercase text-zinc-400 hover:text-white transition-colors">
            Orders
          </Link>

          {mounted && (
            <Link 
              href={user ? "/account" : "/login"} 
              className={`text-[10px] font-mono uppercase transition-colors ${user ? 'text-purple-400 hover:text-purple-300' : 'text-zinc-400 hover:text-white'}`}
            >
              {user ? "Account" : "Login"}
            </Link>
          )}
          
          <button 
            onClick={openCart}
            className="bg-white text-black px-4 py-2 text-[10px] font-black hover:bg-purple-600 hover:text-white transition-all uppercase tracking-tighter"
          >
            CART ({mounted ? itemCount : 0})
          </button>
        </div>
      </div>
    </nav>
  );
}