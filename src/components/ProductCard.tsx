"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../lib/store'; 
import { ChevronLeft, ChevronRight, X } from 'lucide-react'; 
import WishlistButton from './WishlistButton'; 

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const { addItem, openCart } = useCart();
  
  // Carousel State
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSize, setShowQuickSize] = useState(false);

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const images = product.images && product.images.length > 0 ? product.images : ['/blank-tee.png'];

  const handleSelectSizeAndAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0],
      quantity: 1,
      size,
    });
    setShowQuickSize(false);
    openCart();
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="group flex flex-col h-full bg-[#0a0a0a] border border-white/10 hover:border-[#f0c808]/50 transition-colors duration-500 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSize(false);
      }}
    >
      
      {/* 1. INTERACTIVE IMAGE CAROUSEL */}
      <Link href={`/product/${product.id}`} className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 block cursor-crosshair">
        
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name} - View ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out
              ${idx === currentImageIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            `}
          />
        ))}

        <div className="absolute top-4 right-4 z-20">
          <WishlistButton productId={product.id} />
        </div>

        {images.length > 1 && (
          <div className={`absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              onClick={prevImage}
              className="w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-[#f0c808] hover:text-black transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={nextImage}
              className="w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-[#f0c808] hover:text-black transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 w-full flex justify-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 transition-all duration-300 ${idx === currentImageIdx ? 'w-4 bg-[#f0c808]' : 'w-1.5 bg-white/40'}`} 
              />
            ))}
          </div>
        )}
      </Link>

      {/* 2. EDITORIAL TEXT CONTENT */}
      <div className="p-5 flex flex-col flex-grow relative overflow-hidden justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 pr-4">
              <p className="text-[10px] font-mono text-[#f0c808] uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#f0c808] rounded-full inline-block"></span>
                {product.category}
              </p>
              <Link href={`/product/${product.id}`}>
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#f0c808] transition-colors uppercase tracking-tighter leading-none">
                  {product.name}
                </h3>
              </Link>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-mono text-zinc-500 line-through">₹{product.price + 500}</span>
              <span className="text-lg font-mono text-white font-bold">₹{product.price}</span>
            </div>
          </div>
          
          <p className="text-xs text-zinc-400 line-clamp-2 mb-6 font-mono leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* 3. BRUTALIST REVEAL SIZE SELECTOR */}
        <div className="relative mt-auto">
          {showQuickSize ? (
            <div className="bg-zinc-950 border border-[#f0c808] p-3 animate-in fade-in duration-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-[#f0c808] uppercase tracking-widest font-bold">Select Size:</span>
                <button 
                  onClick={(e) => { e.preventDefault(); setShowQuickSize(false); }}
                  className="text-zinc-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => handleSelectSizeAndAdd(sz, e)}
                    className="py-1.5 bg-zinc-900 border border-white/20 hover:border-[#f0c808] hover:bg-[#f0c808] hover:text-black text-white text-xs font-mono font-bold transition-all"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button 
              onClick={(e) => {
                e.preventDefault();
                setShowQuickSize(true);
              }}
              className="relative w-full py-3.5 border border-white/20 bg-transparent text-white font-mono text-xs font-bold uppercase tracking-widest overflow-hidden transition-all group-hover:border-[#f0c808]"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">+ Quick Add (Select Size)</span>
              <div className="absolute inset-0 h-full w-0 bg-[#f0c808] transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}