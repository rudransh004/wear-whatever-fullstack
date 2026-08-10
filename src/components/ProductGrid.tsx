"use client";
import { useFilters } from "../lib/store";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion"; 

export default function ProductGrid({ initialProducts }: { initialProducts: any[] }) {
  const { searchQuery, selectedCategory } = useFilters();

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="max-w-7xl mx-auto min-h-[400px]">
      {filteredProducts.length > 0 ? (
        // UPDATED: Extremely tight gaps for a sleek, dense look (gap-3 md:gap-4)
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 border border-white/5 bg-zinc-950/50 backdrop-blur-md"
        >
          <p className="text-zinc-500 font-mono uppercase tracking-widest text-xs">
            Zero assets found in <span className="text-white">[{selectedCategory}]</span> matching <span className="text-[#f0c808]">"{searchQuery}"</span>
          </p>
        </motion.div>
      )}
    </section>
  );
}