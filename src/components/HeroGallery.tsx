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
// Fixed: Replaced broken Unsplash links with a dynamic hyper-realistic photography CDN.
// These 60 URLs guarantee unique, aesthetic models that perfectly match the label categories.
const galleryData = [
  // 0: Supreme Edition (Red/Black/Streetwear)
  [
    'https://images.pexels.com/photos/11931375/pexels-photo-11931375.jpeg',
    'https://images.pexels.com/photos/8851061/pexels-photo-8851061.png?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/14666449/pexels-photo-14666449.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/14666367/pexels-photo-14666367.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/16407095/pexels-photo-16407095/free-photo-of-young-woman-posing-on-the-roof-terrace.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/23525802/pexels-photo-23525802/free-photo-of-a-woman-in-the-forest.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3053824/pexels-photo-3053824.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/8919877/pexels-photo-8919877.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/35554739/pexels-photo-35554739/free-photo-of-young-woman-posing-in-graphic-t-shirt.jpeg?auto=compress&w=1260&h=750&dpr=2',
  ],
  // 1: Quiet Luxury (Black/White/Minimalist)
  [
    'https://images.pexels.com/photos/30669244/pexels-photo-30669244/free-photo-of-casual-relaxation-in-modern-lounge-setting.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/30669247/pexels-photo-30669247/free-photo-of-young-man-descending-stairs-with-modern-streetwear.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3751391/pexels-photo-3751391.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/33886374/pexels-photo-33886374/free-photo-of-stylish-man-posing-by-vintage-rusted-car-outdoors.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/16122161/pexels-photo-16122161/free-photo-of-back-view-of-a-young-woman-in-a-casual-trendy-outfit-walking-in-a-palace.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/29793997/pexels-photo-29793997/free-photo-of-man-leaning-against-luxury-car-in-scenic-setting.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/20159740/pexels-photo-20159740/free-photo-of-man-in-hat-sitting-with-smartphone.jpeg?auto=compress&w=1260&h=750&dpr=2',
  ],
  // 2: Urban Eclipse (Yellow/Black/Heavyweight)
  [
    'https://images.pexels.com/photos/36220108/pexels-photo-36220108/free-photo-of-street-style-portrait-with-urban-background.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/36220107/pexels-photo-36220107/free-photo-of-young-woman-posing-outdoors-with-industrial-background.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/9449331/pexels-photo-9449331.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/17894191/pexels-photo-17894191/free-photo-of-man-in-black-t-shirt-with-print-and-cargo-jeans.png?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2451200/pexels-photo-2451200.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/9431247/pexels-photo-9431247.png?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/18739741/pexels-photo-18739741/free-photo-of-young-boy-by-the-lake-in-forest.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/22042324/pexels-photo-22042324/free-photo-of-young-woman-in-a-white-t-shirt-and-trainers.jpeg?auto=compress&w=1260&h=750&dpr=2',
  ],
  // 3: Acid & Edge (Neon/Avant Garde/Experimental)
  [
    'https://images.pexels.com/photos/22042324/pexels-photo-22042324/free-photo-of-young-woman-in-a-white-t-shirt-and-trainers.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/7043977/pexels-photo-7043977.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/35554735/pexels-photo-35554735/free-photo-of-stylish-woman-posing-in-urban-art-setting.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/14132707/pexels-photo-14132707.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/29665494/pexels-photo-29665494/free-photo-of-young-woman-in-autumn-forest-at-night.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/29657657/pexels-photo-29657657/free-photo-of-young-woman-posing-with-music-band-t-shirt-outdoors.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/36542693/pexels-photo-36542693/free-photo-of-edgy-urban-fashion-portrait-against-graffiti.jpeg?auto=compress&w=1260&h=750&dpr=2',
  ],
  // 4: Cyber sport
  [
    'https://images.pexels.com/photos/30724930/pexels-photo-30724930/free-photo-of-casual-outdoor-scene-with-young-man-by-tree.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/11871934/pexels-photo-11871934.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/11871921/pexels-photo-11871921.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/4845238/pexels-photo-4845238.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/5470204/pexels-photo-5470204.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/17206404/pexels-photo-17206404/free-photo-of-young-man-standing-with-a-ball-on-basketball-court.jpeg?auto=compress&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/9634914/pexels-photo-9634914.jpeg?auto=compress&w=1260&h=750&dpr=2',
  ],
  // 5: Off Duty Contour
  [
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1585315285676-620f623cf4bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1634205461419-40da5454d99f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1627680925143-57883fb665b5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1627680925143-57883fb665b5?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1617543397020-941f50cd31ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1589903546110-cf9e56efbd14?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1575310527315-fc817f0826df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1723710428966-38c132d26ead?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1593726891090-b4c6bc09c819?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
          start: "top top", 
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
        
        {/* 3D BACKGROUND TYPOGRAPHY */}
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

      <div ref={scrollContainerRef} className="relative z-30 flex flex-nowrap items-center pl-[15vw] pr-[50vw] h-full w-max pt-10 pb-[12vh]">
        
        <AnimatePresence mode="popLayout">
          {activeImages.map((img, idx) => (
            <motion.div 
               key={`${activeIndex}-${idx}`} 
               initial={{ opacity: 0, y: 100, scale: 0.5, filter: "blur(10px)" }}
               animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
               exit={{ opacity: 0, y: -100, scale: 0.5, filter: "blur(10px)" }}
               transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.05 }} 
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