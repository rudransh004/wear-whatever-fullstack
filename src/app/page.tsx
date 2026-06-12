import prisma from "../lib/prisma";
import ProductGrid from "../components/ProductGrid";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/NavBar";
import InteractiveHero from "../components/InteractiveHero";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-[#f0c808] selection:text-black">
      
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 20s linear infinite;
        }
        .text-stroke-outline {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
          color: transparent;
        }
        .text-stroke-hover:hover {
          color: #f0c808;
          -webkit-text-stroke: 0px;
          text-shadow: 0 0 40px rgba(240,200,8,0.4);
        }
      `}} />

      {/* EDITORIAL HERO SECTION */}
      <section id="hero" className="relative w-full min-h-[90vh] flex flex-col justify-center pt-24 pb-20 z-10 overflow-hidden">
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#f0c808]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto px-6 md:px-12 mt-10">
           
           <div className="mb-6 flex items-center gap-4">
             <div className="w-8 h-[1px] bg-[#f0c808]"></div>
             <p className="text-[10px] md:text-xs text-[#f0c808] font-mono uppercase tracking-[0.4em]">
               The Full-Stack Venture Redefined
             </p>
           </div>

           <div className="flex flex-col gap-0 md:gap-2">
              <h1 className="text-[clamp(4rem,14vw,12rem)] font-black tracking-tighter leading-[0.85] uppercase text-white drop-shadow-2xl text-left">
                WEAR
              </h1>
              <h1 className="text-[clamp(4rem,14vw,12rem)] font-black tracking-tighter leading-[0.85] uppercase text-stroke-outline italic drop-shadow-2xl text-stroke-hover transition-all duration-500 cursor-crosshair md:text-right">
                WHATEVER
              </h1>
           </div>

           <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md mt-16 z-20">
              <Link href="/studio" className="group relative w-full flex justify-center py-4 bg-[#f0c808] text-black font-mono text-xs font-bold uppercase tracking-widest overflow-hidden transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(240,200,8,0.15)] hover:shadow-[0_0_30px_rgba(240,200,8,0.3)]">
                  <span className="relative z-10 flex items-center gap-2">Enter Studio <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                  <div className="absolute inset-0 h-full w-0 bg-white transition-all duration-300 ease-out group-hover:w-full z-0"></div>
              </Link>
              <Link href="/#shop" className="w-full flex justify-center py-4 border border-white/20 bg-black/50 text-white font-mono text-xs font-bold uppercase tracking-widest hover:border-white/60 hover:bg-white/5 transition-all hover:-translate-y-1 backdrop-blur-md">
                  Ready to Wear
              </Link>
           </div>
        </div>

        <div className="absolute bottom-10 w-[110vw] left-[-5vw] bg-[#f0c808] text-black py-3 z-20 border-y border-white/20 transform -rotate-2 origin-center shadow-[0_0_30px_rgba(240,200,8,0.15)]">
           <div className="animate-marquee font-mono text-[10px] md:text-xs font-black tracking-widest uppercase whitespace-nowrap">
              <span>ALGORITHMIC BRUTALISM • 1-OF-1 CUSTOM PIECES • PREMIUM HEAVYWEIGHT • DESIGN THE VOID • ALGORITHMIC BRUTALISM • 1-OF-1 CUSTOM PIECES • PREMIUM HEAVYWEIGHT • DESIGN THE VOID •&nbsp;</span>
              <span>ALGORITHMIC BRUTALISM • 1-OF-1 CUSTOM PIECES • PREMIUM HEAVYWEIGHT • DESIGN THE VOID • ALGORITHMIC BRUTALISM • 1-OF-1 CUSTOM PIECES • PREMIUM HEAVYWEIGHT • DESIGN THE VOID •&nbsp;</span>
           </div>
        </div>
      </section>

      {/* THE INTERACTIVE MEECH213 SECTION */}
      <div className="w-full relative z-20 bg-[#0a0a0a] border-t border-white/10">
        <InteractiveHero />
      </div>

      {/* THE SHOP GRID */}
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