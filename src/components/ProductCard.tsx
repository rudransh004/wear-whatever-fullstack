import Image from 'next/image';

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
  return (
    <div className="group relative bg-zinc-900 border border-white/10 overflow-hidden rounded-lg transition-all hover:border-purple-500/50">
      <div className="aspect-square overflow-hidden bg-zinc-800">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-mono text-purple-400 uppercase tracking-widest">{product.category}</p>
            <h3 className="text-lg font-bold text-white mt-1">{product.name}</h3>
          </div>
          <p className="text-lg font-mono text-white">₹{product.price}</p>
        </div>
        <p className="mt-2 text-sm text-gray-400 line-clamp-2">{product.description}</p>
        <button className="mt-4 w-full bg-white text-black py-2 text-sm font-bold hover:bg-purple-500 hover:text-white transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}