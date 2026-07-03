"use client";

import { useState } from "react";
import { useCart } from "../lib/store";
import { ShoppingBag, Ruler } from "lucide-react";

export default function ProductActions({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem, openCart } = useCart();
  
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before deploying to cart.");
      return;
    }
    
    // Pushes the item to your global Zustand store and forces the sidebar open
    addItem({ ...product, quantity: 1, selectedSize });
    openCart();
  };

  return (
    <div className="flex flex-col gap-8 mt-8">
      
      {/* Brutalist Size Selector */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Select Size</span>
          <button className="font-mono text-[10px] text-[#f0c808] hover:text-white uppercase tracking-widest flex items-center gap-1 transition-colors">
            <Ruler className="w-3 h-3" /> Sizing Matrix
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 font-mono text-xs font-bold transition-all duration-300 border ${
                selectedSize === size
                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  : "bg-transparent text-zinc-400 border-white/10 hover:border-white/50 hover:text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Conversion Trigger */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-[#f0c808] hover:bg-white text-black py-5 font-mono text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(240,200,8,0.15)] hover:shadow-[0_0_40px_rgba(240,200,8,0.3)]"
      >
        <ShoppingBag className="w-5 h-5 fill-black" />
        {selectedSize ? "Deploy to Cart" : "Select Size to Deploy"}
      </button>

      {/* Trust Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          <span className="text-white font-bold block mb-1">Dispatch</span>
          Ships in 24-48 Hrs
        </div>
        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          <span className="text-white font-bold block mb-1">Returns</span>
          7-Day Protocol
        </div>
      </div>
    </div>
  );
}