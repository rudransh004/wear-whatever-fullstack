"use client";

import { useState } from "react";
import { useCart } from "../lib/store";
import { ShoppingBag, Ruler, Plus, Minus } from "lucide-react";

export default function ProductActions({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem, openCart } = useCart();
  
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before deploying to cart.");
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images && product.images.length > 0 ? product.images[0] : '/blank-tee.png',
      quantity,
      size: selectedSize,
    });
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

      {/* Quantity Selector */}
      <div>
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-4">Quantity</span>
        <div className="flex items-center w-36 border border-white/20 bg-zinc-950">
          <button 
            onClick={handleDecrement}
            className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors font-mono"
          >
            <Minus size={14} />
          </button>
          <span className="flex-1 text-center font-mono text-sm font-bold text-white">
            {quantity}
          </span>
          <button 
            onClick={handleIncrement}
            className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors font-mono"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Primary Conversion Trigger */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-[#f0c808] hover:bg-white text-black py-5 font-mono text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(240,200,8,0.15)] hover:shadow-[0_0_40px_rgba(240,200,8,0.3)]"
      >
        <ShoppingBag className="w-5 h-5 fill-black" />
        {selectedSize ? `Deploy to Cart (${quantity})` : "Select Size to Deploy"}
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