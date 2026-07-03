"use client";
import { useFilters } from "../lib/store";
import { Search } from "lucide-react";

const categories = ["All", "Oversized", "Graphic", "Anime", "Artist", "Automotive", "Essential", "Urban"];

export default function FilterBar() {
  const { searchQuery, setSearchQuery, selectedCategory, setCategory } = useFilters();

  return (
    <div className="max-w-7xl mx-auto mb-10 w-full">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between w-full">
        
        {/* Sleek Categories Strip (Horizontally scrollable on mobile) */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-all whitespace-nowrap rounded-sm ${
                selectedCategory === cat 
                ? "bg-[#f0c808] text-black font-black shadow-[0_0_15px_rgba(240,200,8,0.2)]" 
                : "bg-zinc-900/50 text-zinc-400 border border-white/5 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Premium Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <input
            type="text"
            placeholder="SEARCH CATALOG..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/10 py-3 pl-10 pr-4 text-white font-mono text-xs focus:border-[#f0c808] focus:bg-black outline-none transition-all uppercase placeholder-zinc-600"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

      </div>
    </div>
  );
}