"use client";
import { useFilters } from "../lib/store";
import ProductCard from "./ProductCard";

export default function ProductGrid({ initialProducts }: { initialProducts: any[] }) {
  // Connect to the global filter state
  const { searchQuery, selectedCategory } = useFilters();

  // Logic to filter the products based on Search and Category
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-white/5 bg-zinc-950/50">
          <p className="text-zinc-600 font-mono uppercase italic tracking-widest text-sm">
            No products found in the "{selectedCategory}" archives matching "{searchQuery}"
          </p>
        </div>
      )}
    </section>
  );
}