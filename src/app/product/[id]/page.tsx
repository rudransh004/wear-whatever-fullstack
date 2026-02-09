import prisma from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-black pt-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="relative aspect-square w-full bg-zinc-900 border border-white/10">
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            fill 
            className="object-cover" 
            priority 
          />
        </div>
        <div className="flex flex-col justify-center text-white">
          <p className="text-purple-500 font-mono uppercase tracking-[0.3em] mb-4">{product.category}</p>
          <h1 className="text-6xl font-black mb-6 uppercase italic">{product.name}</h1>
          <p className="text-4xl font-mono mb-8 italic">₹{product.price}</p>
          <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-xl">{product.description}</p>
          <button className="bg-white text-black py-5 px-12 font-black text-xl hover:bg-purple-600 hover:text-white transition-all w-full md:w-fit">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}