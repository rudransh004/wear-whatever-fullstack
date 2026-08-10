import prisma from "../lib/prisma";
import ProductGrid from "../components/ProductGrid";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/NavBar";
import InteractiveHero from "../components/InteractiveHero";
import HeroSlider from "../components/HeroSlider"; 
import { Zap } from "lucide-react";
import Chatbot from "../components/Chatbot";
import { createClient } from "../utils/supabase/server";
import DotGrid from "../components/DotGrid"; // <-- NEW IMPORT

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const announcementText = "DROP 01: THE VOID IS LIVE • FREE EXPRESS SHIPPING OVER ₹1,999 • MINT YOUR 1-OF-1 CUSTOM PIECE NOW •";

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-[#f0c808] selection:text-black font-sans text-white">
      
      <Navbar />

      {/* KINETIC ANNOUNCEMENT RIBBON */}
      <div className="w-full bg-[#f0c808] text-black py-3 font-mono text-xs font-black uppercase tracking-widest mt-16 md:mt-20 relative z-30 shadow-md overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
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

      <section id="shop" className="w-full bg-[#0a0a0a] pt-20 pb-24 relative z-10 overflow-hidden">
        
        {/* NEW INTERACTIVE BACKGROUND */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#1a1a1a"    /* Dark grey to blend with #0a0a0a */
            activeColor="#f0c808"  /* Brand Yellow */
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Existing Content wrapped in relative z-10 so it sits ABOVE the grid */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 pointer-events-none">
          {/* Note: pointer-events-none on the wrapper ensures the mouse hits the canvas behind it, 
              but we add pointer-events-auto back to the actual UI elements so buttons still work! */}
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 border-b border-white/10 pb-4 pointer-events-auto">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-xs font-mono text-green-500 uppercase tracking-widest">Live Inventory</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Current Drop</h2>
            </div>
            <div className="w-full md:w-auto">
              <FilterBar />
            </div>
          </div>
          
          <div className="min-h-[50vh] mt-10 pointer-events-auto">
            <ProductGrid initialProducts={products} />
          </div>
        </div>
      </section>

      <Chatbot isLoggedIn={!!user} />

    </main>
  );
}