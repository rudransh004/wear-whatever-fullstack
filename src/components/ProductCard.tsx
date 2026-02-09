"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../lib/store'; // Import the Zustand hook

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  // Extract actions from the cart store
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    // 1. Add the specific product data to the global state
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });

    // 2. Open the sidebar so the user sees the confirmation
    openCart();
  };

  return (
    <div className="group flex flex-col h-full bg-zinc-950 border border-white/5 rounded-none overflow-hidden transition-all hover:border-purple-500/40">
      
      {/* 1. IMAGE CONTAINER */}
      <Link href={`/product/${product.id}`} className="relative aspect-square w-full overflow-hidden bg-zinc-900 block">
        <Image 
          src={product.images[0]} 
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </Link>

      {/* 2. TEXT CONTENT */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] font-mono text-purple-500 uppercase tracking-widest mb-1">
              {product.category}
            </p>
            <Link href={`/product/${product.id}`}>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors uppercase italic tracking-tighter">
                {product.name}
              </h3>
            </Link>
          </div>
          <span className="text-lg font-mono text-white">₹{product.price}</span>
        </div>
        
        <p className="text-sm text-zinc-500 line-clamp-2 mb-6 flex-grow leading-relaxed">
          {product.description}
        </p>

        {/* 3. UPDATED BUTTON: Calls handleAddToCart */}
        <button 
          onClick={handleAddToCart}
          className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-tighter hover:bg-purple-600 hover:text-white transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}