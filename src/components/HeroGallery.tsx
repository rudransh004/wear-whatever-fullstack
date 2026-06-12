"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import WatchMenu from './WatchMenu';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  // 1. Supreme Edition
  [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800', 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800',
    'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?q=80&w=800', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800', 'https://images.unsplash.com/photo-1618517351616-38fb9c52e047?q=80&w=800',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'
  ],
  // 2. Epic Thread
  [
    'https://images.unsplash.com/photo-1434389673869-e3fb63d5964f?q=80&w=800', 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800',
    'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800', 'https://images.unsplash.com/photo-1489987707023-afc82478163a?q=80&w=800',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800', 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', 'https://images.unsplash.com/photo-1618517351616-38fb9c52e047?q=80&w=800'
  ],
  // 3. WearWhatever Premium
  [
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800',
    'https://images.unsplash.com/photo-1618517351616-38fb9c52e047?q=80&w=800', 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800',
    'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?q=80&w=800', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800', 'https://images.unsplash.com/photo-1434389673869-e3fb63d5964f?q=80&w=800',
    'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800'
  ],
  // 4. All Products
  [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800', 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800',
    'https://images.unsplash.com/photo-1489987707023-afc82478163a?q=80&w=800', 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800', 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800',
    'https://images.unsplash.com/photo-1618517351616-38fb9c52e047?q=80&w=800', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800'
  ],
  // 5. Special Customs
  [
    'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?q=80&w=800', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800', 'https://images.unsplash.com/photo-1434389673869-e3fb63d5964f?q=80&w=800',
    'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800',
    'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800', 'https://images.unsplash.com/photo-1489987707023-afc82478163a?q=80&w=800',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800'
  ],
  // 6. End of Season Sale
  [
    'https://images.unsplash.com/photo-1618517351616-38fb9c52e047?q=80&w=800', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800',
    'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800', 'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?q=80&w=800',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800', 'https://images.unsplash.com/photo-1434389673869-e3fb63d5964f?q=80&w=800'
  ]
];

export default function HeroGallery({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (idx: number) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
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
        // FIXED: Reduced scale from 1.25 to 1.15, and reduced Y rise from -80 to -30
        // This prevents the image from slamming into the top of the screen
        .to(innerImage, {
           scale: 1.15,
           y: -30, 
           rotation: gsap.utils.random(-3, 3),
           ease: "power1.inOut"
        })
        // FIXED: Reduced drop distance and tilt on exit
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
    <div ref={wrapperRef} className="w-full h-screen bg-[#0a0a0a] overflow-hidden flex items-center relative z-20">
      
      {/* FIXED: Reduced padding bottom (pb-28) to center the smaller cards better */}
      <div ref={scrollContainerRef} className="flex flex-nowrap items-center pl-[15vw] pr-[50vw] h-full w-max pt-10 pb-28">
        
        <AnimatePresence mode="popLayout">
          {activeImages.map((img, idx) => (
            <motion.div 
               key={`${activeIndex}-${idx}`} 
               // FIXED: Reduced Framer Motion Y distance so entry animation isn't so aggressive
               initial={{ opacity: 0, y: 100, scale: 0.5, filter: "blur(10px)" }}
               animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
               exit={{ opacity: 0, y: -100, scale: 0.5, filter: "blur(10px)" }}
               transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.05 }} 
               // FIXED: Shrunk the base card size from h-[55vh] down to h-[45vh]
               className="gallery-card w-[60vw] md:w-[28vw] h-[40vh] md:h-[45vh] flex-shrink-0 mx-8 flex items-center justify-center group"
            >
              <div 
                className="card-inner w-full h-full relative"
                style={{ transform: `scale(0.85) translateY(40px) rotate(${idx % 2 === 0 ? 12 : -12}deg)` }}
              >
                <div className="absolute inset-0 bg-zinc-900 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
                  <img src={img} alt={`Lookbook ${idx}`} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>

      <WatchMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

    </div>
  );
}