"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect } from "react";
// 1. Import the cart store to clear items after payment
import { useCart } from "../../lib/store"; 

function SuccessContent() {
  const searchParams = useSearchParams();
  // Cashfree sends the ID as "order_id" in the URL
  const orderId = searchParams.get("order_id") || searchParams.get("id");
  const { clearCart } = useCart();

  useEffect(() => {
    if (orderId) {
      // 2. Clear the cart securely
      clearCart();
      
      // 3. Save to local storage for the tracking page
      const savedOrders = JSON.parse(localStorage.getItem("wear_whatever_recent_orders") || "[]");
      if (!savedOrders.includes(orderId)) {
        const updatedOrders = [orderId, ...savedOrders].slice(0, 5);
        localStorage.setItem("wear_whatever_recent_orders", JSON.stringify(updatedOrders));
      }
    }
  }, [orderId, clearCart]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8 flex justify-center">
        <div className="h-24 w-24 rounded-full bg-[#f0c808]/10 border border-[#f0c808]/50 flex items-center justify-center animate-pulse">
          <svg className="h-12 w-12 text-[#f0c808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
        Payment Verified
      </h1>
      
      <div className="bg-zinc-950 border border-white/5 p-8 mb-12 text-left">
        <p className="text-zinc-500 font-mono text-[10px] uppercase mb-2">Order Reference</p>
        <p className="text-white font-mono text-lg break-all select-all">
          {orderId || "GENERATING..."}
        </p>
        <p className="text-zinc-500 font-mono text-xs mt-4">
          Your transaction was successful. You can track this ID on the orders page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/orders">
          <button className="w-full bg-zinc-900 text-white border border-white/10 py-4 font-black uppercase hover:bg-zinc-800 transition-all tracking-widest text-sm">
            Track Order
          </button>
        </Link>
        <Link href="/">
          <button className="w-full bg-[#f0c808] text-black py-4 font-black uppercase hover:bg-white transition-all tracking-widest text-sm">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#020202] pt-40 pb-20 px-6">
      <Suspense fallback={<div className="text-white text-center font-mono uppercase">Verifying Transaction...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}