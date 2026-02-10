"use client";
import { useCart } from "../lib/store";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem, openCart } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
    openCart();
  };

  return (
    <button 
      onClick={handleAdd}
      className="w-full lg:w-max bg-white text-black px-12 py-5 font-black text-xl uppercase hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1 active:scale-95"
    >
      Add to Bag
    </button>
  );
}