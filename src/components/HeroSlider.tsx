'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HoverTitle from './HoverTitle'; 
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      isMasterBrandSlide: true,
      badge: "THE FUTURE OF APPAREL",
      subtext: "Algorithmic brutalism meets high-end comfort. Every piece is minted once, uniquely engineered, and delivered to your doorstep.",
      desktopImg: "/banners/slide1.png",
      mobileImg: "/banners/slide-mobile-1.png",
      cta1Text: "Enter AI Studio",
      cta1Link: "/studio",
      cta2Text: "Shop Drop 01",
      cta2Link: "/#shop"
    },
    {
      id: 2,
      isMasterBrandSlide: false,
      headline: "ARCHITECTURE AS APPAREL",
      badge: "HEAVYWEIGHT LUXURY",
      subtext: "Crafted with 280+ GSM ultra-premium cotton. Our silhouettes feature a structured, architectural drape that redefines modern streetwear comfort.",
      desktopImg: "/banners/slide2.png",
      mobileImg: "/banners/slide-mobile-2.png",
      cta1Text: "Shop the Collection",
      cta1Link: "/#shop",
      cta2Text: "Fabric Specs",
      cta2Link: "/about"
    },
    {
      id: 3,
      isMasterBrandSlide: false,
      headline: "MINTED ONCE, NEVER AGAIN",
      badge: "1-OF-1 GUARANTEE",
      subtext: "We reject the culture of mass-reproduction. The design you generate is locked to your identity—zero reprints, zero mass-market duplication.",
      desktopImg: "/banners/slide3.png",
      mobileImg: "/banners/slide-mobile-3.png",
      cta1Text: "Start Minting",
      cta1Link: "/studio",
      cta2Text: "Understand Policy",
      cta2Link: "/terms"
    },
    {
      id: 4,
      isMasterBrandSlide: false,
      headline: "YOUR VISION, OUR CRAFT",
      badge: "AI DESIGN STUDIO",
      subtext: "Transform subjective thought into physical reality. Our proprietary neural node translates your prompts into precision-mapped apparel assets.",
      desktopImg: "/banners/slide4.png",
      mobileImg: "/banners/slide-mobile-4.png",
      cta1Text: "Launch Studio",
      cta1Link: "/studio",
      cta2Text: "Learn Pipeline",
      cta2Link: "/about"
    },
    {
      id: 5,
      isMasterBrandSlide: false,
      headline: "JOIN THE VOID",
      badge: "MEMBER VAULT ACCESS",
      subtext: "Secure your place in our creative ecosystem. Join the community pushing the boundaries of algorithmic fashion and artisanal manufacturing.",
      desktopImg: "/banners/slide5.png",
      mobileImg: "/banners/slide-mobile-5.png",
      cta1Text: "Create Profile",
      cta1Link: "/login",
      cta2Text: "Explore Drops",
      cta2Link: "/#shop"
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Slightly slower for better readability of the new copy
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <div 
      className="relative w-full h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)] bg-[#0a0a0a] overflow-hidden select-none font-sans"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, idx) => {
        const isActive = currentSlide === idx;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <picture className="absolute inset-0 z-0">
              <source media="(min-width: 768px)" srcSet={slide.desktopImg} />
              <img src={slide.mobileImg} alt={slide.badge} className="w-full h-full object-cover object-center filter brightness-[0.6]" />
            </picture>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-transparent z-10" />

            <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-24">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-zinc-300">{slide.badge}</span>
                </div>

                {slide.isMasterBrandSlide ? (
                  <div className="flex flex-col gap-0 my-1">
                    <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-black tracking-tighter uppercase text-white drop-shadow-xl leading-[0.8]">WEAR</h1>
                    <div className="mt-[-8px]"><HoverTitle /></div>
                  </div>
                ) : (
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white leading-[0.9] drop-shadow-xl my-2">{slide.headline}</h2>
                )}

                <p className="mt-6 text-zinc-400 font-mono text-sm max-w-md leading-relaxed">{slide.subtext}</p>

                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <Link href={slide.cta1Link} className="px-8 py-4 bg-[#f0c808] hover:bg-white text-black font-mono text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 fill-black" /> {slide.cta1Text}
                  </Link>
                  <Link href={slide.cta2Link} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-widest backdrop-blur-md transition-all active:scale-95">
                    {slide.cta2Text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-6 left-6 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 transition-all duration-300 rounded-full ${currentSlide === idx ? 'w-10 bg-[#f0c808]' : 'w-4 bg-white/20'}`} />
        ))}
      </div>

      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="w-10 h-10 bg-black/40 hover:bg-[#f0c808] hover:text-black text-white border border-white/10 flex items-center justify-center transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="w-10 h-10 bg-black/40 hover:bg-[#f0c808] hover:text-black text-white border border-white/10 flex items-center justify-center transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}