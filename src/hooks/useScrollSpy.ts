"use client";
import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0]);

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = ids[0];
      
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section crosses the upper 40% of the screen, it becomes active.
          // This entirely bypasses GSAP's artificial scroll bar manipulation.
          if (rect.top <= window.innerHeight * 0.4) {
            currentActive = id;
          }
        }
      }
      
      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids]);

  return activeId;
}