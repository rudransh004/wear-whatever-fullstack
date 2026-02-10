import prisma from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "../../../components/AddToCartButton"; // We will create this next

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Product Image */}
        <div className="relative aspect-square w-full bg-zinc-900 border border-white/5 overflow-hidden rounded-xl">
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            fill 
            priority
            className="object-cover transition-transform duration-700 hover:scale-105" 
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-center">
          <p className="text-purple-500 font-mono text-xs uppercase tracking-[0.4em] mb-4">
            {product.category}
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter">
            {product.name}
          </h1>
          <p className="text-3xl font-mono text-white mb-8">₹{product.price}</p>
          
          <div className="space-y-6 mb-12">
            <h4 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Description</h4>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
              {product.description}
            </p>
          </div>

          {/* Reusable Add to Cart Button */}
          <AddToCartButton product={product} />
          
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
            <div>
              <p className="text-zinc-500 font-mono text-[10px] uppercase">Material</p>
              <p className="text-white text-sm">100% Heavyweight Cotton</p>
            </div>
            <div>
              <p className="text-zinc-500 font-mono text-[10px] uppercase">Shipping</p>
              <p className="text-white text-sm">Worldwide Express</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}