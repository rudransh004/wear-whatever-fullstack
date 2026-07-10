"use client";
import { useState } from 'react';
import { useCart } from "../lib/store";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    
    // Add a tiny artificial delay for premium interaction feel
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : '/blank-tee.png',
        quantity: 1,
        size: 'M'
      });
      setIsAdding(false);
      openCart();
    }, 300);
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={isAdding}
      className="group relative w-full flex justify-center py-5 bg-[#f0c808] text-black font-mono text-sm md:text-base font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(240,200,8,0.15)] hover:shadow-[0_0_40px_rgba(240,200,8,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Background slide effect */}
      <div className="absolute inset-0 h-full w-0 bg-white transition-all duration-300 ease-out group-hover:w-full z-0"></div>
      
      {/* Button Text */}
      <span className="relative z-10 flex items-center gap-3">
        {isAdding ? "ADDING..." : "ADD TO CART"} 
        {!isAdding && <span className="group-hover:translate-x-1 transition-transform">→</span>}
      </span>
    </button>
  );
}