"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../lib/store'; 
import { ChevronLeft, ChevronRight } from 'lucide-react'; // For the carousel arrows

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

  // Safely fallback if the database has no images
  const images = product.images && product.images.length > 0 ? product.images : ['/blank-tee.png'];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents navigating to the product page when clicking "Add to Cart"
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0], // Add the first image to the cart
      quantity: 1,
    });
    openCart();
  };

  // Carousel Navigation Functions
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="group flex flex-col h-full bg-[#0a0a0a] border border-white/10 hover:border-[#f0c808]/50 transition-colors duration-500 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 1. INTERACTIVE IMAGE CAROUSEL */}
      <Link href={`/product/${product.id}`} className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 block cursor-crosshair">
        
        {/* Render all images, but only fade in the active one */}
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

        {/* Carousel Navigation Arrows (Reveal on Hover) */}
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

        {/* Image Indicators (Dots at the bottom) */}
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
      <div className="p-5 flex flex-col flex-grow relative overflow-hidden">
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
        
        <p className="text-xs text-zinc-400 line-clamp-2 mb-6 flex-grow font-mono leading-relaxed">
          {product.description}
        </p>

        {/* 3. BRUTALIST REVEAL BUTTON */}
        <button 
          onClick={handleAddToCart}
          className="relative w-full py-3.5 border border-white/20 bg-transparent text-white font-mono text-xs font-bold uppercase tracking-widest overflow-hidden transition-all group-hover:border-[#f0c808]"
        >
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">Add to Cart</span>
          {/* Yellow Sweep Animation on Hover */}
          <div className="absolute inset-0 h-full w-0 bg-[#f0c808] transition-all duration-300 ease-out group-hover:w-full z-0"></div>
        </button>
      </div>

    </div>
  );
}