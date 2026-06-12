// src/app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 pt-16 pb-8 px-6 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white">
            WEAR <span className="text-[#f0c808] italic">WHATEVER</span>
          </Link>
          <p className="text-xs font-mono text-zinc-500 leading-relaxed max-w-xs">
            The intersection of algorithmic brutalism and premium heavyweight garments. Designed in the void, shipped worldwide.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-2">Explore</h4>
          <Link href="/" className="text-xs font-mono text-zinc-500 hover:text-[#f0c808] transition-colors">Shop All</Link>
          <Link href="/studio" className="text-xs font-mono text-zinc-500 hover:text-[#f0c808] transition-colors">AI Studio</Link>
          <Link href="/about" className="text-xs font-mono text-zinc-500 hover:text-[#f0c808] transition-colors">Our Story</Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-2">Support</h4>
          <Link href="/contact" className="text-xs font-mono text-zinc-500 hover:text-[#f0c808] transition-colors">Contact Us</Link>
          <Link href="/orders" className="text-xs font-mono text-zinc-500 hover:text-[#f0c808] transition-colors">Track Order</Link>
          <Link href="/account" className="text-xs font-mono text-zinc-500 hover:text-[#f0c808] transition-colors">My Account</Link>
        </div>

        {/* Legal Column (CRITICAL FOR PAYMENT GATEWAY) */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-2">Legal</h4>
          <Link href="/terms" className="text-xs font-mono text-zinc-500 hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="text-xs font-mono text-zinc-500 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/refund" className="text-xs font-mono text-zinc-500 hover:text-white transition-colors">Refund & Return Policy</Link>
          <Link href="/shipping" className="text-xs font-mono text-zinc-500 hover:text-white transition-colors">Shipping Policy</Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
        <p className="text-[10px] font-mono text-zinc-600 mb-4 md:mb-0">
          © {currentYear} WEAR WHATEVER. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-4">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Secure Checkout via Razorpay</span>
        </div>
      </div>
    </footer>
  );
}