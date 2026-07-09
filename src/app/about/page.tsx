"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap"; 
import { useEffect, useRef } from "react"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; 
import { ReactLenis } from "lenis/react";
// @ts-ignore: side-effect import for CSS
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const lenisRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    
    return () => gsap.ticker.remove(update);
  }, []);

  useGSAP(() => {
    const sections = document.querySelectorAll(".about-wrapper section");

    sections.forEach((section, index) => {
      const container = section.querySelector(".container");

      gsap.to(container, {
        rotation: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 20%",
          scrub: true,
        },
      });

      if (index === sections.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    });
  }, { scope: containerRef });

  return (
    <>
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
    
    <div className="page-scale about-wrapper">
      <main ref={containerRef}>

      {/* 1️⃣ HERO - Premium, Bulletproof Editorial Layout */}
      <section className="one">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 overflow-hidden w-full z-0 pointer-events-none flex justify-center">
          <span className="text-[28vw] outline-text select-none">ORIGINAL</span>
        </div>

        <div className="container h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 relative z-10">
          <div className="col w-full md:w-1/2 h-full flex flex-col justify-center text-col z-20 relative text-center md:text-left">
            <svg className="absolute -left-10 top-1/3 w-8 h-32 opacity-20 hidden md:block" viewBox="0 0 50 200" fill="currentColor">
              <rect x="0" y="0" width="4" height="200" />
              <rect x="8" y="0" width="2" height="200" />
              <rect x="14" y="0" width="8" height="200" />
              <rect x="26" y="0" width="2" height="200" />
              <rect x="32" y="0" width="6" height="200" />
              <rect x="42" y="0" width="8" height="200" />
            </svg>

            <div className="w-full flex justify-between items-end border-b-2 border-black pb-3 mb-4 md:mb-10">
              <span className="font-mono text-[10px] md:text-sm tracking-widest uppercase font-semibold text-black">EST. 2024</span>
              <span className="font-mono text-[8px] md:text-xs tracking-widest uppercase text-black text-right">Amaravati<br/>16.506° N, 80.648° E</span>
            </div>
            
            <h1 className="text-[clamp(4.5rem,11vw,14rem)] leading-[0.85] tracking-tight text-black mb-4 md:mb-12">
              WEAR<br/>WHATEVER
            </h1>
            
            <div className="max-w-[500px] mx-auto md:mx-0">
              <p className="text-lg md:text-2xl font-bold mb-2 md:mb-4 uppercase tracking-wide text-black">Redefining the Standard.</p>
              <p className="text-sm md:text-[1.1rem] font-medium text-black/80 leading-relaxed">
                We are a canvas for individual expression. Built on a relentless obsession with originality, premium materials, and custom aesthetics. We don't make clothes for the masses; we craft gear for the unapologetically unique.
              </p>
            </div>
          </div>

          <div className="col w-full md:w-1/2 h-full flex items-center justify-center relative z-10 mt-4 md:mt-0"> 
             <div className="relative w-full max-w-[450px] lg:max-w-[550px] aspect-square">
               <div className="col items-center">
                 <div className="image-wrapper relative z-10">
                   <div className="img">
                     <Image src="/main.webp" alt="Origin Story" width={800} height={1000} priority />
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>
      
      {/* 2️⃣ THE ORIGIN */}
      <section className="two">
        <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none opacity-50"></div>
        <svg className="absolute bottom-10 right-10 w-48 h-48 text-white opacity-[0.02] spin-slow pointer-events-none z-0 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="48" />
          <ellipse cx="50" cy="50" rx="48" ry="15" />
          <ellipse cx="50" cy="50" rx="15" ry="48" />
          <line x1="2" y1="50" x2="98" y2="50" />
          <line x1="50" y1="2" x2="50" y2="98" />
        </svg>

        <div className="absolute top-1/3 right-8 font-mono text-sm tracking-[0.3em] text-white/20 uppercase origin-top-right -rotate-90 pointer-events-none hidden lg:block">
          [ 01: GROUND ZERO ]
        </div>

        <div className="container relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-12">
          <div className="col w-full md:w-1/2 h-full flex items-center justify-center relative z-10 mt-4 md:mt-0"> 
             <div className="relative w-full max-w-[450px] lg:max-w-[550px] aspect-square">
               <div className="col items-center">
                 <div className="image-wrapper relative z-10">
                   <div className="img">
                     <Image src="/main.webp" alt="Origin Story" width={800} height={1000} priority />
                   </div>
                 </div>
               </div>
             </div>
          </div>

          <div className="col w-full md:w-1/2 text-col relative z-10 text-center md:text-left">
            <div>
              <span className="mono-tag">[ CHAPTER 01 ] THE GENESIS</span>
              <h2>Ground Zero</h2>
              <p>
                The industry was saturated with generic, low-effort fast fashion. Wear Whatever started when two founders, Rudransh Garg and Rishindra Rao, looked around and realized they couldn't find a single brand that represented their actual aesthetic without a ridiculous markup.
              </p>
              <p>
                What began as a late-night hustle in a first-semester dorm room quickly evolved into a full-scale obsession with apparel mechanics.
              </p>
              <p className="font-medium text-white/70 italic mt-4 md:mt-6 border-none md:border-l-2 pl-0 md:pl-4 border-white text-sm md:text-base">
                "No pre-made templates. No manufacturing shortcuts. Just raw, unfiltered creativity built from the ground up."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ THE EXPANSION */}
      <section className="three">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] border-[1px] border-black/5 rounded-full pulse-slow pointer-events-none z-0 hidden md:block"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[60vw] h-[60vw] border-[1px] border-black/5 rounded-full pulse-slow pointer-events-none z-0 hidden md:block" style={{animationDelay: '1s'}}></div>
        
        <div className="absolute bottom-10 right-0 overflow-hidden w-full z-0 pointer-events-none flex justify-end pr-10">
          <span className="text-[15vw] outline-text select-none">CULTURE</span>
        </div>

        <div className="container relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-12">
          <div className="col text-col text-center md:text-left">
            <div>
              <span className="mono-tag border-black text-black">[ CHAPTER 02 ] THE TAKEOVER</span>
              <h2>Campus To<br/>Culture</h2>
              <p>
                Word of mouth is a powerful thing. Our earliest drops didn't just stay in the dorms—they quickly became the unofficial uniform for the culture's biggest moments. 
              </p>
              <p>
                We stepped up as the primary creative force behind the official merchandise for massive events like <strong>VITOPIA 2024</strong> and <strong>VITOPIA 2025</strong>. 
              </p>
              <p>
                When you wear our custom gear, you aren't just wearing fabric. You are wearing a piece of a collective legacy, designed by the community, for the community.
              </p>
            </div>
          </div>
          <div className="col items-center relative mt-4 md:mt-0">
            <div className="absolute -top-6 -left-6 md:-top-12 md:-left-12 z-20 w-16 h-16 md:w-24 md:h-24 text-black">
              <svg className="w-full h-full spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50 0L55 45L100 50L55 55L50 100L45 55L0 50L45 45L50 0Z" fill="currentColor"/>
              </svg>
              <svg className="absolute inset-0 w-full h-full spin-slow-reverse scale-75 opacity-50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50 0L55 45L100 50L55 55L50 100L45 55L0 50L45 45L50 0Z" fill="transparent"/>
              </svg>
            </div>

            <div className="image-wrapper">
              <div className="img">
                <Image src="/main1.webp" alt="Community Expansion" width={800} height={1000} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ DESIGN LANGUAGE */}
      <section className="four">
        <div className="container flex flex-col md:flex-row items-center gap-4 md:gap-12">
          <div className="col items-center mt-4 md:mt-0 order-2 md:order-1">
            <div className="image-wrapper">
              <div className="img">
                <Image src="/main2.webp" alt="Design Language" width={800} height={1000} />
              </div>
            </div>
          </div>
          <div className="col text-col text-center md:text-left order-1 md:order-2">
            <div>
              <span className="mono-tag">[ CHAPTER 03 ] THE PROCESS</span>
              <h2>Art Of Custom</h2>
              <p className="text-lg md:text-xl font-medium mb-4 md:mb-6">We don't chase fleeting trends. We dictate the vibe.</p>
              <p>
                In a landscape flooded with disposable fashion, we choose deliberate, independent design. Every silhouette, fabric weight, and print technique is heavily tested before it ever reaches you.
              </p>
              <p>
                Whether it is a loud, graphic-heavy statement piece or an understated daily essential, our philosophy remains the same: your apparel should be an undeniable extension of your identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ WHY IT EXISTS */}
      <section className="five">
        <div className="container flex-col md:flex-row items-center relative">
          <svg className="absolute top-[10%] right-[10%] w-[40vw] max-w-[400px] text-white opacity-10 float-anim pointer-events-none z-0 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="30" />
            <line x1="5" y1="50" x2="95" y2="50" strokeWidth="0.5" />
            <line x1="50" y1="5" x2="50" y2="95" strokeWidth="0.5" />
            <rect x="45" y="45" width="10" height="10" fill="currentColor" opacity="0.5" />
          </svg>

          <div className="col flex-col justify-center relative z-10 text-center md:text-left items-center md:items-start">
            <span className="mono-tag border-white/50 text-white w-max">
              [ CORE ETHOS ]
            </span>
            <h2 className="text-[clamp(3.5rem,8vw,8rem)] leading-[0.85] text-white mt-2 md:mt-4 mb-2">
              The<br/>Manifesto
            </h2>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/70 block">
              SYS.REQ // NO_COMPROMISE
            </span>

            <div className="manifesto-badge">
               <svg viewBox="0 0 100 100">
                 <path id="manifestoPath" fill="transparent" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                 <text className="font-mono text-[10.5px] font-bold uppercase tracking-widest" fill="currentColor">
                   <textPath href="#manifestoPath" startOffset="0%">• NO NOISE • JUST SIGNALS • NO NOISE • JUST SIGNALS </textPath>
                 </text>
               </svg>
               <div className="badge-center-icon">✦</div>
            </div>
          </div>
          
          <div className="col flex-col justify-center text-col relative z-10 mt-4 md:mt-0">
            <div className="manifesto-box group">
              <p className="manifesto-highlight">
                Mass production creates noise. We exist to create <span>signals</span>.
              </p>
              <p className="manifesto-body">
                Wear Whatever sits precisely at the intersection of underground streetwear culture and loud individual identity. We believe in the power of the custom-made and the right to stand out. 
              </p>
              <div className="manifesto-footer">
                <div>
                  <strong>Two Creators.</strong>
                  <span>One Vision. Infinite Possibilities.</span>
                </div>
                <div className="cross-icon hidden md:block">✕</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ FOOTER / CLOSING */}
      <section className="six">
        <div className="container">
          <div className="footer-top">
            <h2 className="footer-title">
              JOIN OUR<br/>SYNDICATE
            </h2>
            <div className="footer-form">
              <input type="email" placeholder="your@email.com" />
              <button>Subscribe</button>
            </div>
          </div>

          <div className="spot-label">SPOT US ON</div>

          <div className="footer-banner">
            <Link href="#" className="footer-banner-item"><span>✦</span> Instagram</Link>
            <Link href="#" className="footer-banner-item"><span>✦</span> LinkedIn</Link>
            <Link href="#" className="footer-banner-item"><span>✦</span> Twitter</Link>
            <Link href="#" className="footer-banner-item"><span>✦</span> WhatsApp</Link>
          </div>

          <div className="footer-links">
            {/* <div className="footer-col">
              <h4>Categories</h4>
              <Link href="#">Oversized T-Shirts</Link>
              <Link href="#">New Arrivals</Link>
              <Link href="#">Best Sellers</Link>
            </div> */}
            
            {/* <div className="footer-col">
              <h4>Company</h4>
              <Link href="#">About Us</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms & Conditions</Link>
            </div> */}
            
            {/* <div className="footer-col">
              <h4>Support</h4>
              <Link href="#">Contact Us</Link>
              <Link href="#">FAQs</Link>
              <Link href="#">Shipping Policy</Link>
            </div> */}

            <div className="footer-col">
              <h4>Leadership</h4>
              <div className="founders-row">
                <div className="founder-profile">
                  <div className="founder-avatar">
                    <Image src="/founder.jpeg" alt="Rudransh Garg" width={40} height={40} />
                  </div>
                  <div className="founder-details">
                    <span className="founder-name">Rudransh Garg</span>
                    <span className="founder-role">Founder</span>
                  </div>
                </div>

                <div className="founder-profile">
                  <div className="founder-avatar">
                    <Image src="/founder-rishindera.jpeg" alt="Rishindera Rao" width={40} height={40} />
                  </div>
                  <div className="founder-details">
                    <span className="founder-name">Rishindera Rao</span>
                    <span className="founder-role">CTO</span>
                  </div>
                </div>

                <div className="founder-profile">
                  <div className="founder-avatar">
                    <Image src="/suhani.jpeg" alt="Suhani Sadh" width={40} height={40} />
                  </div>
                  <div className="founder-details">
                    <span className="founder-name">Suhani Sadh</span>
                    <span className="founder-role">Operations Manager</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="marquee-wrapper">
              <div className="animate-marquee">WEAR WHATEVER • FIND YOUR INSIDE • </div>
              <div className="animate-marquee">WEAR WHATEVER • FIND YOUR INSIDE • </div>
            </div>

            <div className="copyright-bar">
              <span>Copyright © WEAR WHATEVER 2026</span>
              <button className="up-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>^</button>
            </div>
          </div>
        </div>
      </section>

      </main>
    </div>
    </>
  );
}