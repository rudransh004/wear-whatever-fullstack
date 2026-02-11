"use client";

import { useState, useEffect } from "react";
import { getOrderById } from "../../lib/actions";

export default function OrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Load recent IDs from browser storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wear_whatever_recent_orders") || "[]");
    setRecentIds(saved);
  }, []);

  // Optimized track function to handle both Form events and Button clicks
  const handleTrack = async (e?: React.FormEvent, idToTrack?: string) => {
    if (e) e.preventDefault(); // Prevent page refresh if triggered by form
    
    const finalId = idToTrack || orderId;
    if (!finalId) return;

    setLoading(true);
    setError("");
    setOrderData(null); // Clear previous results
    
    try {
      const result = await getOrderById(finalId);
      
      if (result) {
        setOrderData(result);
        setOrderId(finalId); // Sync the input field with the ID being tracked
      } else {
        setError("Order not found. Please check your ID.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
          Track Your Gear
        </h1>

        {/* Recent IDs Helper */}
        {recentIds.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-zinc-600 font-mono text-[10px] uppercase">Your Recent IDs:</span>
            {recentIds.map((id) => (
              <button
                key={id}
                type="button" // Explicitly set type to prevent form submission
                onClick={() => handleTrack(undefined, id)}
                className="text-zinc-400 font-mono text-[10px] border border-white/10 px-2 py-1 hover:border-purple-500 hover:text-white transition-all"
              >
                {id.substring(0, 8)}...
              </button>
            ))}
          </div>
        )}

        {/* Main Search Form */}
        <form onSubmit={(e) => handleTrack(e)} className="flex gap-2 mb-16">
          <input
            type="text"
            placeholder="ORDER ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-grow bg-zinc-950 border border-white/10 p-4 text-white font-mono text-sm focus:border-purple-500 outline-none uppercase"
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-white text-black px-8 py-4 font-black uppercase hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50"
          >
            {loading ? "..." : "TRACK"}
          </button>
        </form>

        {/* Display Section */}
        {error && <p className="text-red-500 font-mono text-xs uppercase mb-8">{error}</p>}
        
        {orderData && (
          <div className="bg-zinc-950 border border-white/5 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
              <div>
                <p className="text-zinc-500 font-mono text-[10px] uppercase">Status</p>
                <p className="text-purple-500 font-black uppercase italic text-2xl">{orderData.status}</p>
              </div>
              <div className="text-right">
                <p className="text-zinc-500 font-mono text-[10px] uppercase">Total Amount</p>
                <p className="text-white font-mono text-xl">₹{orderData.totalAmount}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm font-mono uppercase">
                  <span className="text-white">{item.name} x{item.quantity}</span>
                  <span className="text-zinc-500">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}