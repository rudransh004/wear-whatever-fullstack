"use client";

import { useCart } from "../lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { Plus, Minus, Trash2, Tag } from "lucide-react";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, updateSize, appliedCoupon, setCoupon } = useCart();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [promoInput, setPromoInput] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState("");
  const supabase = createClient();

  const sizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    if (isOpen) checkUser();
  }, [isOpen, supabase]);

  // MATH ENGINE
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 && subtotal < 1499 ? 50 : 0;
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "PERCENTAGE") {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }
  
  const finalTotal = subtotal + deliveryFee - discountAmount;

  const handleApplyPromo = async () => {
    setPromoError("");
    if (!promoInput) return;
    setPromoLoading(true);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoInput, cartTotal: subtotal }),
      });
      const data = await res.json();

      if (data.success) {
        setCoupon(data.coupon);
        setPromoInput("");
      } else {
        setPromoError(data.error);
      }
    } catch (err) {
      setPromoError("Failed to apply code.");
    } finally {
      setPromoLoading(false);
    }
  };

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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCart} />
      
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-white/10 h-full p-8 flex flex-col shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Your Cart</h2>
          <button onClick={closeCart} className="text-zinc-500 hover:text-white font-mono uppercase text-xs tracking-widest">Close [X]</button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto space-y-6 pr-2">
          {items.length === 0 ? (
            <p className="text-zinc-600 font-mono uppercase text-center mt-20 italic">Cart is empty.</p>
          ) : (
            items.map((item) => {
              const itemKey = item.cartItemId || `${item.id}-${item.size || 'M'}`;
              return (
                <div key={itemKey} className="flex gap-4 border-b border-white/10 pb-6 items-start">
                  <div className="relative h-24 w-20 bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
                    <Image src={item.image || "/blank-image.png"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-white font-bold uppercase text-sm leading-tight">{item.name}</h3>
                        <button onClick={() => removeItem(itemKey)} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[#f0c808] font-mono text-sm font-bold">₹{item.price}</span>
                        <div className="flex items-center gap-1 bg-zinc-900 border border-white/10 px-2 py-0.5">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">Size:</span>
                          <select value={item.size || 'M'} onChange={(e) => updateSize(itemKey, e.target.value)} className="bg-transparent text-white font-mono text-xs font-bold uppercase outline-none cursor-pointer">
                            {sizes.map((sz) => <option key={sz} value={sz} className="bg-zinc-950 text-white">{sz}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center border border-white/20 bg-black">
                        <button onClick={() => updateQuantity(itemKey, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 font-mono"><Minus size={12} /></button>
                        <span className="w-8 text-center font-mono text-xs font-bold text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(itemKey, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 font-mono"><Plus size={12} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Promo Code & Price Breakdown */}
        {items.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            
            {/* Promo Code System */}
            {!appliedCoupon ? (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="PROMO CODE" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 px-3 py-2 text-white font-mono text-xs uppercase outline-none focus:border-[#f0c808]" 
                  />
                  <button onClick={handleApplyPromo} disabled={promoLoading} className="bg-white text-black px-4 py-2 font-mono text-xs font-bold uppercase hover:bg-[#f0c808] transition-colors">Apply</button>
                </div>
                {promoError && <p className="text-red-500 font-mono text-[10px] uppercase">{promoError}</p>}
              </div>
            ) : (
              <div className="flex justify-between items-center bg-green-500/10 border border-green-500/30 px-3 py-2">
                <span className="text-green-500 font-mono text-xs uppercase flex items-center gap-2"><Tag size={12}/> {appliedCoupon.code} APPLIED</span>
                <button onClick={() => setCoupon(null)} className="text-zinc-400 hover:text-white font-mono text-[10px] uppercase underline">Remove</button>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-zinc-400"><span>Subtotal (GST Included)</span><span>₹{items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span></div>
              <div className="flex justify-between text-zinc-400"><span>Delivery Fee</span><span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span></div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-500"><span>Discount</span><span>-₹{Math.round(discountAmount)}</span></div>
              )}
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-4 mb-4">
              <span className="text-zinc-500 font-mono uppercase text-xs tracking-widest">Total</span>
              <span className="text-2xl font-mono text-white">₹{Math.max(0, finalTotal)}</span>
            </div>

            <button onClick={handleCheckout} className="w-full bg-[#f0c808] text-black py-4 font-black uppercase hover:bg-white transition-all tracking-widest">
              {user ? "Proceed to Checkout" : "Login to Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}