"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Animated Success Icon */}
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
      <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-12">
        Your gear is being prepared for the digital age.
      </p>

      <div className="bg-zinc-950 border border-white/5 p-8 rounded-none mb-12 text-left">
        <p className="text-zinc-500 font-mono text-[10px] uppercase mb-2">Order Reference</p>
        <p className="text-white font-mono text-lg break-all select-all cursor-pointer hover:text-purple-400 transition-colors">
          {orderId || "GENERATING..."}
        </p>
      </div>

      <div className="space-y-4">
        <Link href="/">
          <button className="w-full bg-white text-black py-4 font-black uppercase hover:bg-purple-600 hover:text-white transition-all tracking-tighter">
            Continue Shopping
          </button>
        </Link>
        <p className="text-zinc-600 text-xs font-mono uppercase">
          A confirmation receipt has been sent to your inbox.
        </p>
      </div>
    </div>
  );
}

// Wrapping in Suspense is required when using useSearchParams in Next.js 15
export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6">
      <Suspense fallback={<div className="text-white text-center font-mono">LOADING VENTURE DATA...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}