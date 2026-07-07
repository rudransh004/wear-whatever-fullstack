// src/components/WishlistHydrator.tsx
"use client";

import { useEffect, useRef } from "react";
import { useWishlist } from "../lib/store";

export default function WishlistHydrator({ 
  wishlistIds, 
  userId 
}: { 
  wishlistIds: string[];
  userId: string | null;
}) {
  const { setWishlist, setUserId } = useWishlist();
  
  // Use a ref to prevent unnecessary re-renders in React 19 strict mode
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (!hasHydrated.current) {
      setWishlist(wishlistIds);
      setUserId(userId);
      hasHydrated.current = true;
    }
  }, [wishlistIds, userId, setWishlist, setUserId]);

  return null; 
}