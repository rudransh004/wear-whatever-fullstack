"use client"; // Required if you use hooks like usePathname
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">WEAR WHATEVER</Link>
        <div className="space-x-6 text-sm text-gray-300">
          <Link href="/shop" className="hover:text-white">Shop</Link>
          <Link href="/ai-designer" className="text-purple-400 font-semibold">AI Designer</Link>
        </div>
      </div>
    </nav>
  );
}