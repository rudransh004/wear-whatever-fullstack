"use client";

import { useCart } from "../../lib/store";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { openCart, items } = useCart();
  const [mounted, setMounted] = useState(false);
  
  // 1. Calculate total items (sum of all quantities)
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // 2. Prevent Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter text-white">
          WEAR <span className="text-zinc-500 italic">WHATEVER</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-xs font-mono uppercase text-zinc-400 hover:text-white transition-colors">
            Shop
          </Link>
          
          <Link href="/designer" className="text-xs font-mono uppercase text-purple-400 hover:text-purple-300 transition-colors">
            AI Designer
          </Link>

          {/* New Orders Link added without disturbing existing layout */}
          <Link href="/orders" className="text-xs font-mono uppercase text-zinc-400 hover:text-white transition-colors">
            Orders
          </Link>
          
          {/* 3. The Cart Button - Shows count only after mounting */}
          <button 
            onClick={openCart}
            className="bg-white text-black px-4 py-2 text-xs font-black hover:bg-purple-600 hover:text-white transition-all uppercase tracking-tighter"
          >
            CART ({mounted ? itemCount : 0})
          </button>
        </div>
      </div>
    </nav>
  );
}