"use client";
import { useState } from 'react';

export default function HoverTitle() {
  const [colorIndex, setColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // The exact sequence of colors from your "logo anime.png"
  const colors = [
    { fill: '#00aae6', shadow: 'rgba(0, 170, 230, 0.4)' }, // 1. Blue
    { fill: '#f0c808', shadow: 'rgba(240, 200, 8, 0.4)' },  // 2. Yellow
    { fill: '#ef476f', shadow: 'rgba(239, 71, 111, 0.4)' }, // 3. Pink
    { fill: '#8b2626', shadow: 'rgba(139, 38, 38, 0.4)' }   // 4. Red/Maroon
  ];

  const activeStyle = {
    color: colors[colorIndex].fill,
    WebkitTextStroke: '0px',
    textShadow: `0 0 40px ${colors[colorIndex].shadow}`
  };

  const defaultStyle = {
    color: 'transparent',
    WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
    textShadow: 'none'
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Cycle to the next color in the array for the next hover
    setColorIndex((prev) => (prev + 1) % colors.length);
  };

  return (
    <h1 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="text-[clamp(4rem,14vw,12rem)] font-black tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl transition-all duration-500 cursor-crosshair md:text-right"
      style={isHovered ? activeStyle : defaultStyle}
    >
      WHATEVER
    </h1>
  );
}