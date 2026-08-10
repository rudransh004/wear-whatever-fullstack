"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import WatchMenu from './WatchMenu';

gsap.registerPlugin(ScrollTrigger);

// =========================================================
// 📸 CURATED EDITORIAL STREETWEAR ARRAYS
// =========================================================
const galleryData = [
  // 0: Supreme Edition (Red/Black/Streetwear)
  [
    'https://images.unsplash.com/photo-1529139574466-a30ab75225a8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550614000-4b95d46698dc?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511511450062-85a06822c9be?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552374196-1ab2fa1c5dde?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0c446ca396bb?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512353087810-254cb9859f69?q=80&w=800&auto=format&fit=crop',
  ],
  // 1: Epic Thread (Neon/Cyber/Techwear)
  [
    'https://images.unsplash.com/photo-1492336647228-56455171fc9c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523398002811-999aa8b9581e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618354691458-1f1f7d5c5894?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527718641151-1a4034870f7b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588117305388-c2631a279f82?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1610410488691-6fa780d60d3c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
  ],
  // 2: WearWhatever Premium (Yellow/Black/Heavyweight)
  [
    'https://images.unsplash.com/photo-1485231127000-71a69070ea83?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1488161628813-04466f872507?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517409278775-db632d4b4334?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515347619152-6cf7e96b3d5b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617391104684-25e24bcfdb56?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549448107-1b0b533d7b93?q=80&w=800&auto=format&fit=crop',
  ],
  // 3: All Products (General High Fashion/Graphic)
  [
    'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523398002811-999aa8b9581e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550614000-4b95d46698dc?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588117305388-c2631a279f82?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492336647228-56455171fc9c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop',
  ],
  // 4: Special Customs (Edgy/Avant Garde)
  [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552374196-1ab2fa1c5dde?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485231127000-71a69070ea83?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0c446ca396bb?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618354691458-1f1f7d5c5894?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511511450062-85a06822c9be?q=80&w=800&auto=format&fit=crop',
  ],
  // 5: End of Season Sale (Moody/Action/Models)
  [
    'https://images.unsplash.com/photo-1512353087810-254cb9859f69?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527718641151-1a4034870f7b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515347619152-6cf7e96b3d5b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617391104684-25e24bcfdb56?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549448107-1b0b533d7b93?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
  ],
];

// =========================================================
// 🎬 ENHANCED LIGHTING PROFILES
// =========================================================
const studioLighting = [
  { // 0: Supreme Edition
    bg: "#050000",
    keyLight: "#ff0000",
    rimLight: "#00ffff",
    gridColor: "rgba(255, 0, 0, 0.5)",
    watermark: "SUPREME"
  },
  { // 1: Epic Thread
    bg: "#000300",
    keyLight: "#39ff14",
    rimLight: "#ff00ff",
    gridColor: "rgba(57, 255, 20, 0.5)",
    watermark: "THREAD"
  },
  { // 2: WearWhatever Premium
    bg: "#020202",
    keyLight: "#f0c808",
    rimLight: "#6b21a8",
    gridColor: "rgba(240, 200, 8, 0.4)",
    watermark: "THE VOID"
  },
  { // 3: All Products
    bg: "#030005",
    keyLight: "#ff007f",
    rimLight: "#00e5ff",
    gridColor: "rgba(255, 0, 127, 0.5)",
    watermark: "ARCHIVE"
  },
  { // 4: Special Customs
    bg: "#000105",
    keyLight: "#ffd700",
    rimLight: "#ff007a",
    gridColor: "rgba(255, 215, 0, 0.5)",
    watermark: "CUSTOM"
  },
  { // 5: End of Season Sale
    bg: "#050100",
    keyLight: "#ff4500",
    rimLight: "#00ffff",
    gridColor: "rgba(255, 69, 0, 0.5)",
    watermark: "ON SALE"
  }
];

export default function HeroGallery({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (idx: number) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const light = studioLighting[activeIndex] || studioLighting[2];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = scrollContainerRef.current;
    if (!wrapper || !track) return;

    let ctx = gsap.context(() => {
      const scrollDistance = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top", // Forces precise pinning
          pin: true,
          pinSpacing: true,
          scrub: 1,
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        }
      });

      const cards = gsap.utils.toArray('.gallery-card');
      cards.forEach((card: any) => {
        const innerImage = card.querySelector('.card-inner');
        
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween, 
            start: "left right", 
            end: "right left",   
            scrub: true,
          }
        })
        .to(innerImage, {
           scale: 1.15,
           y: -30, 
           rotation: gsap.utils.random(-3, 3),
           ease: "power1.inOut"
        })
        .to(innerImage, {
           scale: 0.85,
           y: 30, 
           rotation: gsap.utils.random(-15, 15), 
           ease: "power1.inOut"
        });
      });

    }, wrapper);

    return () => ctx.revert();
  }, [activeIndex]); 

  const activeImages = galleryData[activeIndex] || galleryData[0];

  return (
    // FIX 1: z-[40] and strictly opaque bg-[#020202]. 
    // This physically blocks the fixed "WEAR WHATEVER" top hero text from bleeding through.
    <div ref={wrapperRef} className="relative w-full h-[100vh] overflow-hidden flex items-center bg-[#020202] z-[40]" style={{ perspective: "2000px" }}>
      
      {/* ========================================================= */}
      {/* 🎬 DYNAMIC STUDIO BACKGROUND ELEMENTS                       */}
      {/* ========================================================= */}
      
      <motion.div 
        animate={{ backgroundColor: light.bg }} 
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* 3D BACKGROUND TYPOGRAPHY (Scaled down so it fits perfectly on all screens) */}
        <div className="absolute top-[18%] md:top-[20%] w-full flex justify-center items-center pointer-events-none" style={{ transform: "translateZ(-400px)" }}>
          <motion.h1 
            key={light.watermark}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 0.8, 
              y: 0, 
              color: "transparent",
              textShadow: `0px 0px 40px ${light.keyLight}, 0px 0px 10px ${light.rimLight}` 
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.2 }}
            className="text-[14vw] md:text-[12vw] font-black uppercase [-webkit-text-stroke:2px_rgba(255,255,255,0.6)] whitespace-nowrap tracking-tighter"
          >
            {light.watermark}
          </motion.h1>
        </div>

        {/* VERTICAL NEON LIGHT PILLARS */}
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              backgroundColor: i % 2 === 0 ? light.keyLight : light.rimLight, 
              boxShadow: `0 0 50px ${i % 2 === 0 ? light.keyLight : light.rimLight}` 
            }}
            transition={{ duration: 1.5 }}
            className="absolute top-[-50vh] w-[2px] md:w-2 h-[200vh] opacity-30 pointer-events-none"
            style={{
              left: `${10 + i * 13.3}%`,
              transform: "translateZ(-300px)", 
            }}
          />
        ))}

        {/* GLOWING REFLECTIVE STAGE FLOOR */}
        <div className="absolute bottom-[-10vh] w-[150vw] left-[-25vw] h-[50vh] origin-bottom pointer-events-none" style={{ transform: "rotateX(70deg) translateZ(-200px)" }}>
          <motion.div 
            animate={{ 
              background: `
                linear-gradient(to top, #000000 20%, transparent 100%),
                radial-gradient(ellipse at top, ${light.keyLight} 0%, transparent 60%),
                linear-gradient(to right, ${light.gridColor} 2px, transparent 2px),
                linear-gradient(to bottom, ${light.gridColor} 2px, transparent 2px)
              ` 
            }}
            transition={{ duration: 1.5 }}
            className="w-full h-full bg-[size:100%_100%,_100%_100%,_8rem_8rem,_8rem_8rem] opacity-70" 
          />
        </div>

        {/* FLOATING AMBIENT PARTICLES */}
        {isMounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            animate={{ 
              y: [0, -150, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{ 
              duration: Math.random() * 6 + 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 3 
            }}
            className="absolute rounded-full pointer-events-none mix-blend-screen"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              backgroundColor: i % 3 === 0 ? "white" : "transparent",
              boxShadow: i % 3 !== 0 ? `0 0 10px 2px #f0c808` : "none",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateZ(${-Math.random() * 500}px)`, 
            }}
          />
        ))}

        {/* VOLUMETRIC CENTER GLOW */}
        <motion.div 
          animate={{ background: `radial-gradient(circle, ${light.keyLight} 0%, transparent 60%)` }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[80vh] opacity-30 mix-blend-screen pointer-events-none"
        />

      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] pointer-events-none z-10 opacity-90"></div>
      
      {/* ========================================================= */}
      {/* 🎬 FOREGROUND GALLERY TRACK                                 */}
      {/* ========================================================= */}

      {/* FIX 2: Reduced bottom padding (pb-[12vh]) to perfectly center the cards between the navbar and watch dial */}
      <div ref={scrollContainerRef} className="relative z-30 flex flex-nowrap items-center pl-[15vw] pr-[50vw] h-full w-max pt-10 pb-[12vh]">
        
        <AnimatePresence mode="popLayout">
          {activeImages.map((img, idx) => (
            <motion.div 
               key={`${activeIndex}-${idx}`} 
               initial={{ opacity: 0, y: 100, scale: 0.5, filter: "blur(10px)" }}
               animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
               exit={{ opacity: 0, y: -100, scale: 0.5, filter: "blur(10px)" }}
               transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.05 }} 
               // FIX 3: Safe Card Breakpoints (w-[55vw] md:w-[30vw] lg:w-[24vw]) to prevent them from hitting the top of laptops
               className="gallery-card w-[55vw] md:w-[30vw] lg:w-[24vw] h-[35vh] md:h-[40vh] lg:h-[45vh] flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center group"
            >
              <div 
                className="card-inner w-full h-full relative"
                style={{ transform: `scale(0.85) translateY(40px) rotate(${idx % 2 === 0 ? 12 : -12}deg)` }}
              >
                <div className="absolute inset-0 bg-zinc-900 border-2 border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
                  <img src={img} alt={`Lookbook ${idx}`} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>

      {/* THE WATCH MENU */}
      <WatchMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

    </div>
  );
}