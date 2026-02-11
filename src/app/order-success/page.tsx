"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect } from "react"; // Added useEffect

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  // Save ID to LocalStorage on mount
  useEffect(() => {
    if (orderId) {
      const savedOrders = JSON.parse(localStorage.getItem("wear_whatever_recent_orders") || "[]");
      if (!savedOrders.includes(orderId)) {
        const updatedOrders = [orderId, ...savedOrders].slice(0, 5); // Keep last 5
        localStorage.setItem("wear_whatever_recent_orders", JSON.stringify(updatedOrders));
      }
    }
  }, [orderId]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8 flex justify-center">
        <div className="h-24 w-24 rounded-full bg-purple-500/10 border border-purple-500/50 flex items-center justify-center animate-pulse">
          <svg className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
        Order Initialized
      </h1>
      
      <div className="bg-zinc-950 border border-white/5 p-8 mb-12 text-left">
        <p className="text-zinc-500 font-mono text-[10px] uppercase mb-2">Order Reference</p>
        <p className="text-white font-mono text-lg break-all select-all">
          {orderId || "GENERATING..."}
        </p>
      </div>

      <div className="space-y-4">
        <Link href="/">
          <button className="w-full bg-white text-black py-4 font-black uppercase hover:bg-purple-600 hover:text-white transition-all tracking-tighter">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6">
      <Suspense fallback={<div className="text-white text-center font-mono">LOADING VENTURE DATA...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}