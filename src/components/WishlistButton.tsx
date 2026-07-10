// src/components/WishlistButton.tsx
"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "../lib/store";
import { toggleWishlist } from "../lib/actions";
import { useRouter } from "next/navigation"; // 1. Import the Next.js router

export default function WishlistButton({ productId }: { productId: string }) {
  const { wishlistIds, userId, clientToggle } = useWishlist();
  const router = useRouter(); // 2. Initialize the router
  
  const isWishlisted = wishlistIds.includes(productId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop product page click redirection
    
    // 3. Enterprise Auth Check: Redirect instead of browser alert
    if (!userId) {
      router.push("/login?error=Please login to save items to your archive.");
      return;
    }

    // 1. Instant optimistic UI feedback
    clientToggle(productId);

    // 2. Persist to Postgres database in background
    try {
      await toggleWishlist(userId, productId);
    } catch (error) {
      // Revert the optimistic toggle if the database fails
      clientToggle(productId);
      console.error("Failed to sync wishlist with database");
    }
  };

  return (
    <button 
      onClick={handleToggle}
      className="p-2 border border-white/10 bg-black/40 text-white hover:border-[#f0c808] transition-colors duration-300 z-50 relative group"
    >
      <Heart 
        size={18} 
        className={`transition-all duration-300 ${isWishlisted ? "fill-[#f0c808] text-[#f0c808]" : "text-white group-hover:scale-110"}`} 
      />
    </button>
  );
}