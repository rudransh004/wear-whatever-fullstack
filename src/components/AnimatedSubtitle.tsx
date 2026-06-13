"use client";

export default function AnimatedSubtitle() {
  const text = "ARCHITECTED FOR THE INDIVIDUAL";
  
  // The 4 colors used in HoverTitle
  const colors = [
    { fill: '#00aae6', shadow: 'rgba(0, 170, 230, 0.4)' }, // 1. Blue
    { fill: '#f0c808', shadow: 'rgba(240, 200, 8, 0.4)' },  // 2. Yellow
    { fill: '#ef476f', shadow: 'rgba(239, 71, 111, 0.4)' }, // 3. Pink
    { fill: '#8b2626', shadow: 'rgba(139, 38, 38, 0.4)' }   // 4. Red/Maroon
  ];

  return (
    <p className="text-[10px] md:text-xs text-[#f0c808] font-mono uppercase tracking-[0.4em] cursor-default">
      {text.split("").map((char, index) => {
        if (char === " ") return <span key={index}>&nbsp;</span>;
        const colorConfig = colors[index % colors.length];
        
        return (
          <span
            key={index}
            className="transition-all duration-300 inline-block hover:-translate-y-1 hover:scale-125 cursor-crosshair"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colorConfig.fill;
              e.currentTarget.style.textShadow = `0 0 10px ${colorConfig.shadow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '';
              e.currentTarget.style.textShadow = '';
            }}
          >
            {char}
          </span>
        );
      })}
    </p>
  );
}