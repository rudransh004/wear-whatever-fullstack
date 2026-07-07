// src/components/WishlistProvider.tsx
import { createClient } from "../utils/supabase/server"; 
import { getUserWishlist } from "../lib/actions";
import WishlistHydrator from "./WishlistHydrator";

export default async function WishlistProvider() {
  const supabase = await createClient();
  
  // 1. Fetch user securely on the server
  const { data: { user } } = await supabase.auth.getUser();

  let savedIds: string[] = [];

  // 2. Fetch their saved items if they exist
  if (user) {
    savedIds = await getUserWishlist(user.id);
  }

  // 3. Pass the data seamlessly to the client UI
  return <WishlistHydrator userId={user?.id || null} wishlistIds={savedIds} />;
}