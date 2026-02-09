import prisma from "../lib/prisma";
import ProductCard from "../components/ProductCard";

export default async function Home() {
  // 1. Fetch products from Supabase via Prisma
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-black pt-24 pb-12 px-6">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-7xl font-bold tracking-tighter text-white mb-4">
          WEAR <span className="text-gray-500 underline decoration-purple-500">WHATEVER</span>
        </h1>
        <p className="text-xl text-gray-400 font-mono italic">
          High-performance apparel for the digital age.
        </p>
      </section>

      {/* 2. Product Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}