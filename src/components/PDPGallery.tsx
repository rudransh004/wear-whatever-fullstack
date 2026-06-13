"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PDPGallery({ images, productName }: { images: string[], productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback in case a product only has 1 image
  const displayImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800'];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full w-full">
      
      {/* THUMBNAIL CAROUSEL (Left side on desktop, bottom on mobile) */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 scrollbar-hide shrink-0 pb-2 md:pb-0">
        {displayImages.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-20 h-24 md:w-full md:h-32 shrink-0 border-2 overflow-hidden transition-all duration-300 ${activeIndex === idx ? 'border-[#f0c808] opacity-100' : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/30'}`}
          >
            <img src={img} alt={`${productName} thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
            {activeIndex === idx && (
              <motion.div layoutId="active-thumb" className="absolute inset-0 bg-[#f0c808]/10 pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      {/* MAIN IMAGE DISPLAY */}
      <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[80vh] bg-zinc-900 border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={displayImages[activeIndex]}
            alt={`${productName} - View ${activeIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

    </div>
  );
}