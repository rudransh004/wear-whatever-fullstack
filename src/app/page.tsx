import prisma from "../lib/prisma";
import ProductGrid from "../components/ProductGrid";
import FilterBar from "../components/FilterBar";

export default async function Home() {
  // 1. Fetching the full inventory from Supabase (Server-side)
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-black pt-32 pb-12 px-6">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4 uppercase italic">
          WEAR <span className="text-zinc-700 underline decoration-purple-600 underline-offset-8">WHATEVER</span>
        </h1>
        <p className="text-sm md:text-lg text-zinc-500 font-mono uppercase tracking-[0.3em]">
          The Full-Stack Venture Redefined
        </p>
      </section>

      {/* 2. The Interactive Filter UI */}
      <FilterBar />

      {/* 3. The Client-Side Grid (Handles real-time search/filter) */}
      <ProductGrid initialProducts={products} />
    </main>
  );
}