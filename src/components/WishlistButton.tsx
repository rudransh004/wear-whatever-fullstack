// src/components/WishlistButton.tsx
"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "../lib/store";
import { toggleWishlist } from "../lib/actions";

export default function WishlistButton({ productId }: { productId: string }) {
  // Grab the userId directly from your global store instead of fetching it via Supabase
  const { wishlistIds, userId, clientToggle } = useWishlist();
  
  const isWishlisted = wishlistIds.includes(productId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop product page click redirection
    
    // Use the global userId to check if they are logged in
    if (!userId) {
      alert("Please login to use the wishlist system.");
      return;
    }

    // 1. Instant optimistic UI feedback
    clientToggle(productId);

    // 2. Persist to Postgres database in background
    await toggleWishlist(userId, productId);
  };

  return (
    <button 
      onClick={handleToggle}
      className="p-2 border border-white/10 bg-black/40 text-white hover:border-[#f0c808] transition-colors duration-300 z-50 relative"
    >
      <Heart 
        size={18} 
        className={isWishlisted ? "fill-[#f0c808] text-[#f0c808]" : "text-white"} 
      />
    </button>
  );
}