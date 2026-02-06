import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white">
              WEAR <span className="text-gray-500">WHATEVER</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 text-sm font-medium">
              <Link href="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link>
              <Link href="/ai-designer" className="text-purple-400 hover:text-purple-300 transition-colors font-semibold">AI Designer</Link>
              <Link href="/orders" className="text-gray-300 hover:text-white transition-colors">Orders</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white text-sm">Login</button>
            <button className="bg-white text-black px-4 py-2 text-sm font-bold hover:bg-gray-200 transition-all">Cart (0)</button>
          </div>
        </div>
      </div>
    </nav>
  );
}