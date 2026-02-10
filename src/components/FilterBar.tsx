"use client";
import { useFilters } from "../lib/store";

const categories = ["All", "Oversized", "Graphic", "Anime", "Artist", "Automotive", "Essential", "Urban"];

export default function FilterBar() {
  const { searchQuery, setSearchQuery, selectedCategory, setCategory } = useFilters();

  return (
    <div className="max-w-7xl mx-auto mb-12 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="SEARCH THE VENTURE..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow bg-zinc-950 border border-white/10 p-4 text-white font-mono text-sm focus:border-purple-500 outline-none transition-all uppercase"
        />
        
        {/* Category Dropdown (Mobile) or Buttons (Desktop) */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${
                selectedCategory === cat 
                ? "bg-white text-black border-white" 
                : "text-zinc-500 border-white/10 hover:border-purple-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}