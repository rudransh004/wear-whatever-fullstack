"use client";
import { useState } from 'react';
import HeroGallery from './HeroGallery';

export default function InteractiveHero() {
  const [activeIndex, setActiveIndex] = useState(2); 

  // FIXED: The Anti-Jump Handler
  const handleCategoryChange = (newIndex: number) => {
    // 1. Find the pinned container
    const heroElement = document.getElementById("interactive-hero");
    
    if (heroElement) {
      // 2. Find its exact position on the page
      const topPos = heroElement.getBoundingClientRect().top + window.scrollY;
      
      // 3. Instantly lock the user to the top of the pin BEFORE state changes
      // This prevents the browser from dropping to the Shop section when GSAP recalculates
      window.scrollTo({ top: topPos, behavior: 'instant' }); 
    }
    
    // 4. Update the images safely
    setActiveIndex(newIndex);
  };

  return (
    // Added the id="interactive-hero" so the handler can find this exact container
    <div id="interactive-hero" className="w-full relative z-20 bg-[#0a0a0a]">
      <HeroGallery activeIndex={activeIndex} setActiveIndex={handleCategoryChange} />
    </div>
  );
}