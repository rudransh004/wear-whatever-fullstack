"use client";

import { useCart } from "../lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, updateSize } = useCart();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  const sizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    if (isOpen) checkUser();
  }, [isOpen, supabase]);

  const handleCheckout = () => {
    closeCart();
    if (user) {
      router.push("/checkout");
    } else {
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
            items.map((item) => {
              const itemKey = item.cartItemId || `${item.id}-${item.size || 'M'}`;
              return (
                <div key={itemKey} className="flex gap-4 border-b border-white/10 pb-6 items-start">
                  <div className="relative h-24 w-20 bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
                    <Image 
                      src={item.image || "/blank-image.png"} 
                      alt={item.name || "Product"} 
                      fill 
                      className="object-cover" 
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-white font-bold uppercase text-sm leading-tight">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(itemKey)} 
                          className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      {/* Price & Size Selector */}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[#f0c808] font-mono text-sm font-bold">₹{item.price}</span>
                        
                        {/* Size Dropdown */}
                        <div className="flex items-center gap-1 bg-zinc-900 border border-white/10 px-2 py-0.5">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">Size:</span>
                          <select
                            value={item.size || 'M'}
                            onChange={(e) => updateSize(itemKey, e.target.value)}
                            className="bg-transparent text-white font-mono text-xs font-bold uppercase focus:outline-none cursor-pointer"
                          >
                            {sizes.map((sz) => (
                              <option key={sz} value={sz} className="bg-zinc-950 text-white">
                                {sz}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center border border-white/20 bg-black">
                        <button 
                          onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 font-mono"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 font-mono"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-xs font-mono text-zinc-500">
                        Subtotal: <strong className="text-white">₹{item.price * item.quantity}</strong>
                      </span>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex justify-between items-end mb-6">
            <span className="text-zinc-500 font-mono uppercase text-xs tracking-widest">Total</span>
            <span className="text-2xl font-mono text-white">
              ₹{items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </span>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-[#f0c808] text-black py-4 font-black uppercase hover:bg-white transition-all tracking-widest disabled:opacity-50"
          >
            {user ? "Checkout Now" : "Login to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}