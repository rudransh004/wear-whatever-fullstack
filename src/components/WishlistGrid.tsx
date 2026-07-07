// src/components/WishlistGrid.tsx
"use client";

import { useWishlist } from "../lib/store";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { HeartCrack, Sparkles } from "lucide-react";

export default function WishlistGrid({ initialProducts }: { initialProducts: any[] }) {
  const { wishlistIds } = useWishlist();

  // Instantly filter out products that are no longer in the Zustand store
  const visibleProducts = initialProducts.filter((product) =>
    wishlistIds.includes(product.id)
  );

  // Show empty state if everything is removed
  if (visibleProducts.length === 0) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center bg-zinc-950/50 border border-white/5 backdrop-blur-md">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
          <HeartCrack className="w-8 h-8 text-zinc-600" />
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-3">Archive Empty</h3>
        <p className="text-zinc-500 font-mono text-xs uppercase mb-8 max-w-sm mx-auto leading-relaxed">
          You have not saved any assets yet. Explore the current drop to curate your collection.
        </p>
        <Link href="/#shop" className="group flex items-center justify-center gap-2 bg-[#f0c808] text-black px-8 py-4 font-mono text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(240,200,8,0.1)]">
          <Sparkles className="w-4 h-4" /> Explore Catalog
        </Link>
      </div>
    );
  }

  // Render the filtered grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}