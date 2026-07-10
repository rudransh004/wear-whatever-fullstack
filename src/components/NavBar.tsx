"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ShoppingCart, User, Search, Wand2, Info, Heart } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';

// Import your existing store and auth client
import { useCart } from '../lib/store'; 
import { createClient } from '../utils/supabase/client';

import { useWishlist } from "../lib/store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  // Live Store & Auth States
  const { openCart, items } = useCart();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  // Scroll Spy for Home / Shop highlights
  const activeSection = useScrollSpy(['hero', 'shop']); 

  // Calculate live cart count
  const itemCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  const { wishlistIds } = useWishlist();

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // NEW: Smart Scroll Interceptor for GSAP Pinned Sections
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Only intercept if we are on the homepage
    if (window.location.pathname === '/' || window.location.pathname === '') {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        // Calculate the exact pixel location in the document (bypassing GSAP padding issues)
        const yOffset = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: yOffset, behavior: 'smooth' });
      }
    }
    // Close the mobile menu automatically if it was open
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* 1. CUSTOM LOGO IMAGE */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img src="/logo.png" alt="Wear Whatever Logo" className="h-8 md:h-10 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity" />
            </Link>
          </div>

          {/* 2. MAIN LINKS (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 ml-10 flex-1">
            {/* Added onClick handlers to intercept the #hash jumps */}
            <Link href="/#hero" onClick={(e) => handleNavClick(e, 'hero')} className={`text-sm font-mono tracking-widest font-bold transition-colors ${activeSection === 'hero' ? 'text-[#f0c808]' : 'text-white hover:text-[#f0c808]'}`}>
              HOME
            </Link>
            <Link href="/#shop" onClick={(e) => handleNavClick(e, 'shop')} className={`text-sm font-mono tracking-widest font-bold transition-colors ${activeSection === 'shop' ? 'text-[#f0c808]' : 'text-white hover:text-[#f0c808]'}`}>
              SHOP
            </Link>
            <Link href="/studio" className="flex items-center gap-2 text-sm font-mono tracking-widest font-bold text-white hover:text-[#9381ff] transition-colors">
              <Wand2 size={16} /> STUDIO
            </Link>
            <Link href="/about" className="text-sm font-mono tracking-widest font-bold text-white hover:text-[#f0c808] transition-colors">
              ABOUT
            </Link>
          </div>

          {/* 3. ICONS & TOOLS (Desktop) */}
          <div className="hidden md:flex items-center space-x-6 text-white justify-end">
            
            {/* Functional Search Bar */}
            <div className="relative flex items-center">
              {isSearchOpen && (
                <form onSubmit={handleSearch} className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search drops..." 
                    autoFocus
                    className="bg-zinc-900 border border-[#f0c808]/50 text-white text-xs font-mono px-3 py-1.5 rounded-none focus:outline-none focus:border-[#f0c808] w-48 transition-all"
                  />
                </form>
              )}
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-[#f0c808] transition-colors z-10" title="Search">
                 <Search size={20} />
              </button>
            </div>

            {/* Dynamic User Account Link */}
            <Link href={user ? "/account" : "/login"} className={`transition-colors ${user ? 'text-green-400 hover:text-green-300' : 'hover:text-[#f0c808]'}`} title="Account">
               <User size={20} />
            </Link>

            <Link href="/wishlist" className="relative group">
              <Heart className="w-5 h-5 text-white" />
  
              {/* The Dynamic Counter Badge */}
              {wishlistIds.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f0c808] text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(240,200,8,0.3)]">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Live Cart Integration */}
            <button onClick={openCart} className="hover:text-[#f0c808] transition-colors relative" title="Cart">
               <ShoppingCart size={20} />
               {mounted && itemCount > 0 && (
                 <span className="absolute -top-2 -right-2 bg-[#f0c808] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                   {itemCount}
                 </span>
               )}
            </button>
          </div>

          {/* 4. MOBILE MENU & CART */}
          <div className="md:hidden flex items-center justify-end gap-5">
            <Link href="/wishlist" className="text-white hover:text-[#f0c808]">
              <Heart size={24} />
            </Link>
            <button onClick={openCart} className="text-white hover:text-[#f0c808] relative">
               <ShoppingCart size={24} />
               {mounted && itemCount > 0 && (
                 <span className="absolute -top-2 -right-2 bg-[#f0c808] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                   {itemCount}
                 </span>
               )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#f0c808]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-[#f0c808]/20 px-4 pt-2 pb-6 space-y-4 shadow-2xl absolute w-full left-0 top-[100%]">
          
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex w-full mt-4">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..." 
              className="bg-zinc-900 border border-zinc-700 text-white text-sm font-mono px-4 py-2 w-full focus:outline-none focus:border-[#f0c808]"
            />
            <button type="submit" className="bg-[#f0c808] text-black px-4 font-bold"><Search size={18} /></button>
          </form>

          <div className="flex flex-col space-y-5 mt-4">
            {/* Added onClick handlers to mobile menu as well */}
            <Link href="/#hero" onClick={(e) => handleNavClick(e, 'hero')} className={`font-mono uppercase text-sm font-bold tracking-widest ${activeSection === 'hero' ? 'text-[#f0c808]' : 'text-white'}`}>HOME</Link>
            <Link href="/#shop" onClick={(e) => handleNavClick(e, 'shop')} className={`font-mono uppercase text-sm font-bold tracking-widest ${activeSection === 'shop' ? 'text-[#f0c808]' : 'text-white'}`}>SHOP</Link>
            <Link href="/studio" onClick={() => setIsOpen(false)} className="text-[#9381ff] font-mono uppercase text-sm font-bold tracking-widest flex items-center gap-3">
              <Wand2 size={18}/> AI STUDIO
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-white hover:text-[#f0c808] font-mono uppercase text-sm font-bold flex items-center gap-3">
              <Info size={18}/> ABOUT US
            </Link>
            
            <hr className="border-white/10 my-2" />
            
            <Link href={user ? "/account" : "/login"} onClick={() => setIsOpen(false)} className={`font-mono uppercase text-sm font-bold flex items-center gap-3 ${user ? 'text-green-400' : 'text-white hover:text-[#f0c808]'}`}>
              <User size={18}/> {user ? "MY ACCOUNT" : "LOGIN"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}