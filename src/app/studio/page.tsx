"use client";

import { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import ReactCrop, { type Crop } from "react-image-crop";

export default function StudioPage() {
  // --- GENERATION STATE ---
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // --- UI FLOW STATE ---
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // --- EDITOR STATE (STEP 2) ---
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: "%", x: 0, y: 0, width: 100, height: 100 });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  
  // DUMMY FEATURE: Toggles visually but doesn't break the CSS below.
  const [applyBgRemoval, setApplyBgRemoval] = useState(true); 
  const imgRef = useRef<HTMLImageElement>(null);

  // --- E-COMMERCE CONFIGURATOR STATE (STEP 3) ---
  const [garmentType, setGarmentType] = useState("Premium Polo");
  const [garmentColor, setGarmentColor] = useState("#ffffff");
  const [placement, setPlacement] = useState("Front Center"); 
  const [size, setSize] = useState("L");
  const [graphicScale, setGraphicScale] = useState(100); 
  const [graphicOpacity, setGraphicOpacity] = useState(90);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setIsGenerating(true);
    setGeneratedImage(null);
    setCroppedImage(null);
    setStep(1); 

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedImage(data.imageUrl);
        setCroppedImage(data.imageUrl); 
        setStep(2); 
      } else {
        alert("Generation failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // --- CROP & EDIT LOGIC ---
  const applyEditAndProceed = () => {
    if (!imgRef.current || !completedCrop || completedCrop.width === 0 || completedCrop.height === 0) {
      setStep(3);
      return;
    }

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );
      
      const base64Image = canvas.toDataURL("image/png");
      setCroppedImage(base64Image);
    }
    setStep(3);
  };

  const handleUndo = () => {
    setCroppedImage(generatedImage); 
    setCrop({ unit: "%", x: 0, y: 0, width: 100, height: 100 });
  };

  const placementStyles: Record<string, { top: string, left: string, transform: string, baseWidth: number }> = {
    "Front Center": { top: "30%", left: "50%", transform: "translateX(-50%)", baseWidth: 40 },
    "Left Chest": { top: "25%", left: "65%", transform: "translateX(-50%)", baseWidth: 15 },
    "Right Chest": { top: "25%", left: "35%", transform: "translateX(-50%)", baseWidth: 15 },
    "Large Back": { top: "25%", left: "50%", transform: "translateX(-50%)", baseWidth: 50 },
    "Lower Left Hem": { top: "65%", left: "30%", transform: "translateX(-50%)", baseWidth: 20 },
  };

  const colorPalette = [
    { name: "Optic White", hex: "#ffffff" },
    { name: "Bleached Bone", hex: "#e6e3db" },
    { name: "Cement Grey", hex: "#b5b5b5" },
    { name: "Washed Sand", hex: "#c9bba6" },
    { name: "Faded Olive", hex: "#8a917a" },
    { name: "Slate Blue", hex: "#7c8594" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['DM_Sans'] overflow-x-hidden pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* ================= LEFT COLUMN: CONTROLS ================= */}
        <div className="flex flex-col sticky top-24">
          <span className="font-mono text-sm tracking-[0.2em] text-[#f0c808] uppercase mb-4 block">
            [ MODULE 01: CREATOR ]
          </span>
          <h1 className="text-[clamp(3rem,5vw,5rem)] leading-[0.9] font-['Newsflash_BB'] uppercase text-white mb-6">
            Design<br />The Void
          </h1>
          
          {/* ----- STEP 1: GENERATION CONTROLS ----- */}
          {step === 1 && (
            <form onSubmit={handleGenerate} className="flex flex-col gap-6 mb-10 animate-fade-in">
              <p className="text-lg text-white/70 mb-4 max-w-md">
                Input your concept. Our neural engine will generate a hyper-detailed, brutalist graphic.
              </p>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., A cyber-punk barcode matrix melting into an industrial skull..."
                  className="w-full bg-black/50 border border-white/20 rounded-xl p-6 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f0c808] transition-colors resize-none h-32 font-mono text-sm"
                />
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt}
                className={`w-full py-4 uppercase font-bold tracking-widest text-sm rounded-xl transition-all ${
                  isGenerating 
                    ? "bg-white/10 text-white/50 cursor-not-allowed" 
                    : "bg-white text-black hover:bg-[#f0c808] hover:text-black"
                }`}
              >
                {isGenerating ? "INITIALIZING SEQUENCE..." : "GENERATE CONCEPT"}
              </button>
            </form>
          )}

          {/* ----- STEP 2: THE STUDIO EDITOR ----- */}
          {step === 2 && generatedImage && (
            <div className="flex flex-col gap-6 animate-fade-in border-t border-white/10 pt-8 mt-4">
              <h3 className="text-xl font-bold font-mono text-[#f0c808] uppercase">Studio Editor</h3>
              <p className="text-sm text-gray-400 font-mono mb-2">Drag the edges of the image on the right to crop out unwanted areas.</p>
              
              <div className="bg-[#111] p-5 rounded-xl border border-white/5 space-y-4 shadow-inner">
                {/* BG Removal Toggle - DUMMY UI */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-mono tracking-widest text-[#f0c808] uppercase block">Remove Background</label>
                    <span className="text-xs text-gray-500 font-mono">Blends white pixels into the fabric.</span>
                  </div>
                  <button 
                    onClick={() => setApplyBgRemoval(!applyBgRemoval)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${applyBgRemoval ? 'bg-[#f0c808]' : 'bg-gray-700'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${applyBgRemoval ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <button 
                  onClick={handleUndo} 
                  className="py-4 border border-white/20 rounded-md font-mono text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
                >
                  Reset / Undo
                </button>
                <button 
                  onClick={applyEditAndProceed} 
                  className="py-4 bg-[#f0c808] text-black font-bold uppercase tracking-widest rounded-md font-mono text-sm hover:bg-white transition-colors"
                >
                  Confirm & Proceed →
                </button>
              </div>
            </div>
          )}

          {/* ----- STEP 3: E-COMMERCE CONFIGURATOR ----- */}
          {step === 3 && croppedImage && (
            <div className="flex flex-col gap-8 animate-fade-in border-t border-white/10 pt-8 mt-4 h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
              <button 
                onClick={() => setStep(2)}
                className="self-start text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>←</span> BACK TO EDITOR
              </button>
              
              {/* Garment Selection */}
              <div>
                <label className="text-xs font-mono tracking-widest text-[#f0c808] uppercase mb-3 block">1. Select Garment</label>
                <select 
                  value={garmentType} 
                  onChange={(e) => setGarmentType(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white p-4 rounded-md font-mono text-sm focus:border-[#f0c808] outline-none"
                >
                  <option>Premium Polo</option>
                  <option>Heavyweight Tee</option>
                  <option>Oversized Drop-Shoulder</option>
                </select>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-xs font-mono tracking-widest text-[#f0c808] uppercase mb-3 block">2. Garment Dye</label>
                <div className="flex flex-wrap gap-3">
                  {colorPalette.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setGarmentColor(color.hex)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${garmentColor === color.hex ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 font-mono mt-2 uppercase">{colorPalette.find(c => c.hex === garmentColor)?.name}</p>
              </div>

              {/* Placement, Scale & Blending */}
              <div className="bg-[#111] p-5 rounded-xl border border-white/5 space-y-6 shadow-inner">
                <div>
                  <label className="text-xs font-mono tracking-widest text-[#f0c808] uppercase mb-3 block">3. Layout & Blending</label>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {Object.keys(placementStyles).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setPlacement(pos)}
                        className={`py-3 px-2 text-xs font-mono uppercase transition-all border ${placement === pos ? 'border-[#f0c808] text-[#f0c808] bg-[#f0c808]/10' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                      >
                        {pos}
                      </button>
                    ))}
                    <button
                      onClick={() => setPlacement("Custom")}
                      className={`py-3 px-2 text-xs font-mono uppercase transition-all border col-span-2 flex items-center justify-center gap-2 ${placement === "Custom" ? 'border-[#f0c808] text-[#f0c808] bg-[#f0c808]/10 shadow-[0_0_10px_rgba(240,200,8,0.2)]' : 'border-[#f0c808]/40 text-[#f0c808]/80 hover:border-[#f0c808] hover:text-[#f0c808]'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                      Freeform Editor (Drag & Resize)
                    </button>
                  </div>
                </div>

                {/* Scale Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-mono tracking-widest text-gray-400 uppercase">Graphic Scale</label>
                    <span className="text-xs font-mono text-gray-400">{placement === "Custom" ? "Managed in Editor" : `${graphicScale}%`}</span>
                  </div>
                  <input 
                    type="range" min="50" max="150" 
                    value={graphicScale} onChange={(e) => setGraphicScale(Number(e.target.value))}
                    disabled={placement === "Custom"}
                    className={`w-full h-1 rounded-lg appearance-none transition-opacity duration-300 ${placement === "Custom" ? "bg-gray-800/30 cursor-not-allowed opacity-50" : "bg-gray-800 cursor-pointer accent-[#f0c808]"}`}
                  />
                </div>

                {/* Transparency / Blend Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3 mt-4">
                    <label className="text-xs font-mono tracking-widest text-[#f0c808] uppercase">Fabric Blend (Transparency)</label>
                    <span className="text-xs font-mono text-gray-400">{graphicOpacity}%</span>
                  </div>
                  <input 
                    type="range" min="30" max="100" 
                    value={graphicOpacity} onChange={(e) => setGraphicOpacity(Number(e.target.value))}
                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#f0c808]"
                  />
                </div>
              </div>

              {/* Sizing */}
              <div>
                <label className="text-xs font-mono tracking-widest text-[#f0c808] uppercase mb-3 block">4. Select Size</label>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`flex-1 py-4 font-mono text-sm font-bold border transition-all ${size === s ? 'border-[#f0c808] text-[#f0c808] bg-[#f0c808]/10' : 'border-gray-700 text-gray-500 hover:text-white'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkout Block */}
              <div className="bg-[#f0c808] text-black p-6 rounded-xl mt-4 flex items-center justify-between hover:bg-white transition-colors cursor-pointer shadow-[0_0_30px_rgba(240,200,8,0.2)]">
                <div>
                  <p className="text-2xl font-black font-mono">₹2,499</p>
                  <p className="text-xs font-bold font-mono tracking-widest mt-1">1-OF-1 CUSTOM PIECE</p>
                </div>
                <span className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                  Add to Cart <span className="text-xl">→</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN: VISUAL OUTPUTS ================= */}
        <div className="flex justify-center items-start lg:sticky lg:top-24">
          
          {/* ----- STEP 1: GENERATING PREVIEW ----- */}
          {step === 1 && (
            <div className="flex flex-col items-center w-full animate-fade-in">
              <div className="w-full max-w-[550px] aspect-square border border-white/10 relative bg-[#111] flex justify-center items-center shadow-2xl rounded-2xl overflow-hidden">
                {!isGenerating ? (
                  <div className="text-center opacity-30 font-mono text-xs tracking-widest text-white">
                    <p>AWAITING INPUT</p>
                  </div>
                ) : (
                  <div className="text-center font-mono flex flex-col items-center z-30">
                    <svg className="w-12 h-12 text-[#f0c808] animate-spin mb-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M50 10 A40 40 0 1 1 10 50" strokeLinecap="round" />
                    </svg>
                    <p className="text-[#f0c808] animate-pulse text-xs tracking-widest">PROCESSING TENSORS...</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ----- STEP 2: REACT CROP EDITOR ----- */}
          {step === 2 && generatedImage && (
             <div className="w-full max-w-[550px] bg-[#111] p-6 rounded-2xl border border-white/10 shadow-2xl animate-fade-in flex flex-col items-center">
               <p className="text-gray-500 font-mono text-xs mb-4 uppercase tracking-widest">Interactive Crop Tool Active</p>
               <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)} className="max-h-[60vh]">
                 <img ref={imgRef} src={generatedImage} alt="Crop preview" crossOrigin="anonymous" className="max-w-full object-contain" />
               </ReactCrop>
             </div>
          )}

          {/* ----- STEP 3: REALISTIC MOCKUP PREVIEW ----- */}
          {step === 3 && croppedImage && (
            <div className="w-full max-w-[600px] aspect-[4/5] relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex justify-center items-center bg-[#0a0a0a] animate-fade-in border border-white/5">
              
              {/* Layer 0: Animated Studio Background Orbs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[5%] left-[5%] w-[350px] h-[350px] bg-[#f0c808] opacity-[0.15] rounded-full filter blur-[90px] animate-blob"></div>
                <div className="absolute bottom-[5%] right-[5%] w-[350px] h-[350px] bg-[#9381ff] opacity-[0.15] rounded-full filter blur-[90px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#00f0ff] opacity-[0.1] rounded-full filter blur-[90px] animate-blob animation-delay-4000"></div>
              </div>

              {/* Bounding Box: Ensures the shirt perfectly scales inside the 4:5 card */}
              <div className="absolute inset-6 sm:inset-10 flex justify-center items-center">
                
                {/* Layer 1: The REAL Blank Garment Image (Rendered normally so textures & collars show!) */}
                <img 
                  src="/blank-tee.png" 
                  alt="Blank Garment" 
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl z-10 pointer-events-none select-none"
                  draggable={false}
                />

                {/* Layer 2: Garment Dye Tint Layer */}
                <div 
                  className="absolute inset-0 z-20 transition-colors duration-700 ease-in-out pointer-events-none mix-blend-multiply" 
                  style={{ 
                    backgroundColor: garmentColor === "#ffffff" ? "transparent" : garmentColor,
                    WebkitMaskImage: "url('/blank-tee.png')",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    maskImage: "url('/blank-tee.png')",
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat"
                  }}
                ></div>

                {/* Layer 3: The AI Graphic Layer */}
                {placement !== "Custom" ? (
                  <div 
                    className="absolute z-30 transition-all duration-300 ease-out pointer-events-none"
                    style={{ 
                      top: placementStyles[placement].top,
                      left: placementStyles[placement].left,
                      transform: placementStyles[placement].transform,
                      width: `${(placementStyles[placement].baseWidth * graphicScale) / 100}%`
                    }}
                  >
                    <img 
                      src={croppedImage} 
                      alt="Garment Design" 
                      // HARDCODED mix-blend-multiply to hide the white background
                      className="w-full h-auto object-contain mix-blend-multiply" 
                      style={{ 
                        opacity: graphicOpacity / 100,
                        filter: "contrast(1.05) brightness(1.02)"
                      }}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 z-30 overflow-hidden pointer-events-auto">
                    <Rnd
                      default={{ x: 120, y: 150, width: 250, height: 250 }}
                      bounds="parent"
                      lockAspectRatio={true}
                      className="group border-2 border-transparent hover:border-[#f0c808]/50 active:border-dashed active:border-[#f0c808] transition-colors cursor-move"
                    >
                      <img 
                        src={croppedImage} 
                        alt="Garment Design" 
                        // HARDCODED mix-blend-multiply
                        className="w-full h-full object-contain pointer-events-none select-none mix-blend-multiply" 
                        style={{ 
                          opacity: graphicOpacity / 100,
                          filter: "contrast(1.05) brightness(1.02)"
                        }}
                        draggable={false}
                      />
                      
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-[#f0c808] text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono tracking-widest border border-white/10">
                        DRAG TO MOVE • CORNERS TO RESIZE
                      </div>
                    </Rnd>
                  </div>
                )}
              </div>

              {/* Studio Lighting Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none z-40 mix-blend-overlay"></div>
            </div>
          )}

        </div>
      </div>
      
      {/* Global CSS animations and scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />
    </div>
  );
}