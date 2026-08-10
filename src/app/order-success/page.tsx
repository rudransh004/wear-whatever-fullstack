"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../lib/store"; // 1. Import your Zustand cart

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; order_id?: string; id?: string }>;
}) {
  // 2. Unwrap the promise safely on the client side using React.use()
  const resolvedParams = use(searchParams);
  
  // 3. Handle PayU/Cashfree ID variations safely
  const orderId = resolvedParams.orderId || resolvedParams.order_id || resolvedParams.id || "Order ID Not Found";

  // 4. Get the clearCart function from your Zustand store
  const { clearCart } = useCart();

  // 5. Run the side-effects: Clear the cart and save to local storage
  useEffect(() => {
    if (orderId && orderId !== "Order ID Not Found") {
      // Empty the user's shopping cart now that they paid!
      clearCart();
      
      // Save the order to local storage so they can track it later
      const savedOrders = JSON.parse(localStorage.getItem("wear_whatever_recent_orders") || "[]");
      if (!savedOrders.includes(orderId)) {
        const updatedOrders = [orderId, ...savedOrders].slice(0, 5);
        localStorage.setItem("wear_whatever_recent_orders", JSON.stringify(updatedOrders));
      }
    }
  }, [orderId, clearCart]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-lg shadow-2xl text-center">
        
        {/* Animated Checkmark / Pulse Graphic */}
        <div className="mb-8 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-[#f0c808]/10 border border-[#f0c808]/50 flex items-center justify-center animate-pulse">
            <svg className="h-12 w-12 text-[#f0c808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-black text-[#f0c808] mb-2 tracking-tighter uppercase italic">
          Payment Verified
        </h1>
        <p className="text-zinc-400 mb-6">Your transaction was successful.</p>
        
        <div className="bg-black p-4 rounded border border-zinc-800 mb-8 text-left">
          <p className="text-sm text-zinc-500 uppercase tracking-widest mb-1">Order Reference</p>
          <p className="text-lg font-mono text-white break-all select-all">{orderId}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/orders" className="w-full">
            <button className="w-full bg-zinc-950 text-white border border-zinc-800 py-3 font-bold hover:bg-zinc-800 transition-colors tracking-widest uppercase text-xs h-full rounded">
              Track Order
            </button>
          </Link>
          <Link href="/shop" className="w-full">
            <button className="w-full bg-[#f0c808] text-black font-bold py-3 px-4 rounded hover:bg-yellow-400 transition-colors tracking-widest uppercase text-xs h-full">
              Shop More
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}