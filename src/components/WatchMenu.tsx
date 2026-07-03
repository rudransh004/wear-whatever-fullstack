"use client";
import { motion } from 'framer-motion';

const options = [
  "The Power Sync", "Quiet Luxury", "Urban Eclipse",
  "Acid & Edge", "Cyber-Sport", "Off-Duty Contour"
];

const angles = [-75, -45, -22, 22, 45, 75]; 

export default function WatchMenu({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (idx: number) => void }) {
  return (
    // FIXED: Reduced overall height container from 300px to 180px
    <div className="absolute bottom-4 left-0 w-full h-[180px] flex justify-center items-end z-[100] pointer-events-none">
      
      {/* FIXED: Scaled down the glass arc to w-[600px] and h-[180px] */}
      <div className="absolute bottom-0 w-[600px] h-[180px] rounded-t-full bg-black/60 backdrop-blur-xl border-t border-l border-r border-[#f0c808]/20 shadow-[0_-20px_60px_rgba(0,0,0,0.6)] pointer-events-auto"></div>
      
      {/* Pivot Point at the bottom center (slightly smaller) */}
      <div className="absolute bottom-0 w-6 h-6 bg-black border-[3px] border-[#f0c808] rounded-full z-20 shadow-[0_0_15px_rgba(240,200,8,0.8)] pointer-events-auto" />

      {/* FIXED: Scaled down the Needle */}
      <motion.div 
        className="absolute bottom-[12px] w-1 h-[130px] bg-gradient-to-t from-[#f0c808] to-[#f0c808]/10 origin-bottom rounded-t-full z-10 pointer-events-none"
        animate={{ rotate: angles[activeIndex] }} 
        transition={{ type: "spring", stiffness: 60, damping: 14 }}
      />

      {/* Interactive Labels */}
      {options.map((option, index) => {
        const angle = angles[index];
        // FIXED: Reduced radius from 250 to 150 to fit the smaller dashboard perfectly
        const radius = 150; 
        
        const x = Math.sin(angle * (Math.PI / 180)) * radius;
        const y = Math.cos(angle * (Math.PI / 180)) * radius; 

        return (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`absolute font-mono uppercase tracking-[0.1em] transition-all duration-300 ease-out pointer-events-auto py-1.5 px-3 rounded-full whitespace-nowrap
              ${activeIndex === index 
                ? 'text-[#f0c808] text-[9px] md:text-[10px] font-black scale-110 drop-shadow-[0_0_8px_rgba(240,200,8,0.8)] z-30 bg-black/50 border border-[#f0c808]/30' 
                : 'text-white/60 text-[8px] md:text-[9px] hover:text-white hover:bg-white/5 z-20'}`}
            style={{ 
              left: `calc(50% + ${x}px)`, 
              bottom: `${y}px`, 
              transform: 'translate(-50%, 50%)' 
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}