"use client";

import { useState } from "react";
import { getOrderById } from "../../lib/actions";

export default function OrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError("");
    
    const result = await getOrderById(orderId);
    
    if (result) {
      setOrderData(result);
    } else {
      setError("Order not found. Please check your ID.");
      setOrderData(null);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
          Track Your Gear
        </h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-10">
          Enter your reference ID to check deployment status.
        </p>

        {/* Tracking Form */}
        <form onSubmit={handleTrack} className="flex gap-2 mb-16">
          <input
            type="text"
            placeholder="ORDER ID (e.g. clx123...)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-grow bg-zinc-950 border border-white/10 p-4 text-white font-mono text-sm focus:border-purple-500 outline-none transition-all uppercase"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-white text-black px-8 py-4 font-black uppercase hover:bg-purple-600 hover:text-white transition-all text-sm"
          >
            {loading ? "SEARCHING..." : "TRACK"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 font-mono text-xs uppercase mb-8">{error}</p>}

        {/* Order Display */}
        {orderData && (
          <div className="bg-zinc-950 border border-white/5 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
              <div>
                <p className="text-zinc-500 font-mono text-[10px] uppercase">Status</p>
                <p className="text-purple-400 font-black uppercase italic text-2xl tracking-tighter">
                  {orderData.status}
                </p>
              </div>
              <div className="text-right">
                <p className="text-zinc-500 font-mono text-[10px] uppercase">Total Amount</p>
                <p className="text-white font-mono text-xl">₹{orderData.totalAmount}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-zinc-500 font-mono text-[10px] uppercase mb-4">Items in Deployment</p>
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-white uppercase font-bold">{item.name} <span className="text-zinc-600 font-normal ml-2">x{item.quantity}</span></span>
                  <span className="text-zinc-400 font-mono italic">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-zinc-500 font-mono text-[10px] uppercase">Shipping Destination</p>
              <p className="text-zinc-300 text-sm mt-1 uppercase leading-relaxed">{orderData.address}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}