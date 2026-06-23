import prisma from "../lib/prisma";
import ProductGrid from "../components/ProductGrid";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/NavBar";
import InteractiveHero from "../components/InteractiveHero";
import HeroSlider from "../components/HeroSlider"; 
import { Zap } from "lucide-react";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // The Marquee Content
  const announcementText = "DROP 01: THE VOID IS LIVE • FREE EXPRESS SHIPPING OVER ₹1,999 • MINT YOUR 1-OF-1 CUSTOM PIECE NOW •";

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-[#f0c808] selection:text-black font-sans text-white">
      
      <Navbar />

      {/* KINETIC ANNOUNCEMENT RIBBON */}
      <div className="w-full bg-[#f0c808] text-black py-3 font-mono text-xs font-black uppercase tracking-widest mt-16 md:mt-20 relative z-30 shadow-md overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* We map twice to ensure the loop is seamless */}
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 shrink-0 px-6">
              <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 fill-black" /> {announcementText}</span>
              <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 fill-black" /> {announcementText}</span>
            </div>
          ))}
        </div>
      </div>

      <HeroSlider />

      <div className="w-full relative z-20 bg-[#0a0a0a] border-t border-white/10">
        <InteractiveHero />
      </div>

      <section id="shop" className="w-full bg-[#0a0a0a] pt-20 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-xs font-mono text-green-500 uppercase tracking-widest">Live Inventory</p>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Current Drop</h2>
            </div>
            <div className="w-full md:w-auto">
              <FilterBar />
            </div>
          </div>
          
          <div className="min-h-[50vh] mt-8">
            <ProductGrid initialProducts={products} />
          </div>
        </div>
      </section>

    </main>
  );
}