"use client";

import { useCart } from "../../lib/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// @ts-ignore: No types available for this package
import { load } from "@cashfreepayments/cashfree-js";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const orderData = {
      customer: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"), 
        address: formData.get("address"),
      },
      items: items,
      total: total
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok && data.success && data.payment_session_id) {
        
        // EXPLICIT ENVIRONMENT CHECK FOR FRONTEND
        const envMode = process.env.NEXT_PUBLIC_CASHFREE_ENVIRONMENT === "PRODUCTION" ? "production" : "sandbox";
        
        const cashfree = await load({
          mode: envMode,
        });

        let checkoutOptions = {
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_self",
        };

        cashfree.checkout(checkoutOptions);
        
      } else {
        throw new Error(data.error || "Failed to generate payment session");
      }
    } catch (error) {
      console.error("Checkout failed", error);
      alert("Payment Gateway Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Shipping Form */}
        <div className="space-y-8">
          <h1 className="text-4xl font-black uppercase italic text-white tracking-tighter">
            Shipping <span className="text-zinc-700">Information</span>
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" required placeholder="FULL NAME" className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-mono focus:border-yellow-500 outline-none transition-all uppercase" />
            <input name="email" type="email" required placeholder="EMAIL ADDRESS" className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-mono focus:border-yellow-500 outline-none transition-all uppercase" />
            <input name="phone" type="tel" required minLength={10} maxLength={10} placeholder="PHONE NUMBER (10 DIGITS)" className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-mono focus:border-yellow-500 outline-none transition-all uppercase" />
            <textarea name="address" required placeholder="COMPLETE SHIPPING ADDRESS" className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-mono focus:border-yellow-500 outline-none transition-all h-32 uppercase" />
            <button type="submit" disabled={loading || items.length === 0} className="w-full bg-yellow-500 text-black py-5 font-black uppercase hover:bg-yellow-400 transition-all disabled:opacity-50">
              {loading ? "INITIALIZING SECURE GATEWAY..." : "PAY SECURELY"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-zinc-950 border border-white/5 p-8 h-fit lg:sticky lg:top-32">
          <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest border-b border-white/10 pb-4">
            Bag Summary
          </h2>
          <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="relative h-12 w-12 bg-zinc-900 border border-white/5 overflow-hidden">
                    <Image src={item.image || "/blank-image.png"} alt={item.name || "Product Image"} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold uppercase">{item.name}</p>
                    <p className="text-zinc-500 font-mono text-[10px]">QTY: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-white font-mono text-sm">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-end border-t border-white/10 pt-6">
            <span className="text-zinc-500 font-mono uppercase text-[10px]">Total</span>
            <span className="text-4xl font-mono text-white tracking-tighter">₹{total}</span>
          </div>
        </div>
      </div>
    </main>
  );
}