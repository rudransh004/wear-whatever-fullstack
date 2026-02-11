"use client";

import { deleteOrder } from "../lib/actions";

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  const handleDelete = async () => {
    // browser events like 'confirm' only work in Client Components
    if (confirm("Are you sure you want to delete this deployment?")) {
      await deleteOrder(orderId);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="text-[10px] text-zinc-600 hover:text-red-500 uppercase font-black tracking-tighter transition-colors"
    >
      Delete
    </button>
  );
}