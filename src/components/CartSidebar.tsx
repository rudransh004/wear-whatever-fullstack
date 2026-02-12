"use client";

import { useCart } from "../lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Added for programmatic navigation
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client"; // Added to check auth status

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem } = useCart();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  // Check auth status whenever the sidebar opens
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    if (isOpen) checkUser();
  }, [isOpen, supabase]);

  const handleCheckout = () => {
    closeCart(); // Close sidebar first
    if (user) {
      router.push("/checkout"); // Proceed if logged in
    } else {
      // Redirect to login with a query param to show a notice
      router.push("/login?error=Please login to complete your order");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCart} />
      
      {/* Sidebar Content */}
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-white/10 h-full p-8 flex flex-col shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Your Cart</h2>
          <button onClick={closeCart} className="text-zinc-500 hover:text-white font-mono uppercase text-xs tracking-widest">Close [X]</button>
        </div>

        <div className="flex-grow overflow-y-auto space-y-6 pr-2">
          {items.length === 0 ? (
            <p className="text-zinc-600 font-mono uppercase text-center mt-20 italic">Cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-white/5 pb-6">
                <div className="relative h-20 w-20 bg-zinc-900 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-white font-bold uppercase text-sm">{item.name}</h3>
                  <p className="text-zinc-500 font-mono text-xs mt-1">QTY: {item.quantity} × ₹{item.price}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500/50 hover:text-red-500 text-xs uppercase font-mono">Remove</button>
              </div>
            ))
          )}
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex justify-between items-end mb-6">
            <span className="text-zinc-500 font-mono uppercase text-xs tracking-widest">Total</span>
            <span className="text-2xl font-mono text-white">₹{items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
          </div>

          {/* Dynamic Button with Auth Guard */}
          <button 
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-white text-black py-4 font-black uppercase hover:bg-purple-600 hover:text-white transition-all tracking-tighter disabled:opacity-50"
          >
            {user ? "Checkout Now" : "Login to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}