import prisma from "../../../lib/prisma";
import { notFound } from "next/navigation";
import ProductActions from "../../../components/ProductActions"; // UPDATED IMPORT
import PDPGallery from "../../../components/PDPGallery"; 
import Navbar from "../../../components/NavBar";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#020202] selection:bg-[#f0c808] selection:text-black pt-24 pb-20 overflow-x-hidden">
      
      <Navbar />

      {/* Subtle Studio Background Grids */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 mt-10">
        
        {/* Breadcrumb / Category Tracker */}
        <div className="mb-8 flex items-center gap-4">
           <div className="w-8 h-[1px] bg-[#f0c808]"></div>
           <p className="text-[10px] md:text-xs text-[#f0c808] font-mono uppercase tracking-[0.4em]">
             ARCHIVE // {product.category}
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Interactive Product Gallery */}
          <div className="lg:col-span-7 w-full">
            <PDPGallery images={product.images} productName={product.name} />
          </div>

          {/* RIGHT: Sticky Product Details */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:sticky lg:top-32">
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase italic tracking-tighter leading-[0.85] drop-shadow-xl">
              {product.name}
            </h1>
            
            <p className="text-3xl font-mono text-[#f0c808] mb-10 tracking-widest">
              ₹{product.price.toFixed(2)}
            </p>
            
            <div className="space-y-4 mb-10 border-b border-white/10 pb-10">
              <h4 className="text-[#f0c808] font-mono text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#f0c808] rounded-full inline-block animate-pulse"></span> Details
              </h4>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl font-sans">
                {product.description}
              </p>
            </div>

            {/* INTEGRATED: The professional Size & Cart flow */}
            <ProductActions product={product} />
            
            {/* Brutalist Specs Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-white/10 mt-12 pt-8">
              <div>
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Material</p>
                <p className="text-white text-sm font-bold tracking-wide">100% HEAVYWEIGHT COTTON</p>
              </div>
              <div>
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Shipping</p>
                <p className="text-white text-sm font-bold tracking-wide">WORLDWIDE EXPRESS</p>
              </div>
              <div>
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Fit</p>
                <p className="text-white text-sm font-bold tracking-wide">OVERSIZED / BOXY</p>
              </div>
              <div>
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Care</p>
                <p className="text-white text-sm font-bold tracking-wide">MACHINE WASH COLD</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}