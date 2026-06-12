// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore: CSS import handled by Next.js
import "./globals.css";
import NavBar from "../components/NavBar";
import CartSidebar from "../components/CartSidebar";
import Footer from "../components/Footer"; // NEW: Import the Footer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WEAR WHATEVER | Design The Void",
  description: "Algorithmic brutalism meets premium heavyweight garments. Design your 1-of-1 piece using AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <NavBar />
        <CartSidebar /> 
        
        {/* 'flex-grow' ensures the main content pushes the footer to the bottom of the screen */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer /> {/* NEW: Inject the Footer here */}
      </body>
    </html>
  );
}