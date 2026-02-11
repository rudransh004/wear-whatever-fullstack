"use client";

import { updateOrderStatus } from "../lib/actions";
import { useState } from "react";

export default function StatusUpdateButton({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    // If it's Processing, change to Shipped. If Shipped, change back to Processing.
    const nextStatus = currentStatus === "Processing" ? "Shipped" : "Delivered";
    await updateOrderStatus(orderId, nextStatus);
    setLoading(false);
  };

  return (
    <button
      onClick={handleUpdate}
      disabled={loading}
      className="text-[10px] font-black uppercase border border-purple-500/50 px-2 py-1 text-purple-400 hover:bg-purple-500 hover:text-white transition-all disabled:opacity-50"
    >
      {loading ? "..." : `MARK AS ${currentStatus === "Processing" ? "SHIPPED" : "DELIVERED"}`}
    </button>
  );
}