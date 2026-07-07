// src/app/wishlist/page.tsx

import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import Navbar from "../../components/NavBar";
// Import the smart client component
import WishlistGrid from "../../components/WishlistGrid";

// Force dynamic rendering so the page always checks the latest DB state on hard reloads
export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // 1. Auth Guard
  if (!user || error) {
    redirect('/login?error=Please login to access your saved archive');
  }

  // 2. Fetch Wishlisted Items
  const wishlistedItems = await prisma.wishlist.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: true, 
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Extract just the product objects
  const products = wishlistedItems.map((item: any) => item.product);

  return (
    <main className="min-h-screen bg-[#020202] text-white pt-32 pb-24 overflow-x-hidden selection:bg-[#f0c808] selection:text-black">
      <Navbar />
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="w-8 h-[1px] bg-[#f0c808] mb-6"></div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
              Saved <span className="text-[#f0c808]">Archive</span>
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mt-4">
              Your curated 1-of-1 concepts and assets.
            </p>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            {/* Note: This total is the server-side count on load. */}
            Total Assets: {products.length}
          </div>
        </div>

        {/* Hand off the data to the interactive Client Component */}
        <WishlistGrid initialProducts={products} />

      </div>
    </main>
  );
}