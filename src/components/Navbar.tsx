"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Announcement Bar */}
      <div className="bg-[#183670] text-white py-1 md:py-1.5 px-3 sm:px-6 lg:px-12 flex flex-row items-center justify-center relative min-h-[36px] overflow-hidden">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] sm:text-[11px] md:text-sm font-bold text-center truncate">
            Founding Member Program Open – Limited Spots Available
          </span>
          <Link href="#cta" className="hidden sm:inline-flex shrink-0 items-center gap-1 bg-white text-[#183670] px-3 py-0.5 rounded-full text-xs hover:bg-blue-50 transition-colors">
            Join Now
          </Link>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-sm w-full relative">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.svg" alt="MGN Logo" className="h-7 w-auto object-contain" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-8 text-sm font-semibold text-gray-600 whitespace-nowrap px-4">
            <a href="#features" className="hover:text-[#183670] transition-colors">Features</a>
            <a href="#who" className="hover:text-[#183670] transition-colors">Who It's For</a>
            <a href="#cta" className="hover:text-[#183670] transition-colors">Get Started</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4 text-sm font-semibold whitespace-nowrap shrink-0">
            <a href="#cta" className="rounded bg-[#183670] px-5 py-2 text-white hover:bg-[#0B1B3D] shadow-sm transition-all">
              Join Early Access
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {isMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-600">
            <a href="#features" className="py-2 hover:text-[#183670]" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#who" className="py-2 hover:text-[#183670]" onClick={() => setIsMenuOpen(false)}>Who It's For</a>
            <a href="#cta" className="py-2 hover:text-[#183670]" onClick={() => setIsMenuOpen(false)}>Get Started</a>
            <hr />
            <a href="#cta" className="text-center rounded bg-[#183670] py-2.5 text-white font-bold" onClick={() => setIsMenuOpen(false)}>
              Join Early Access
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
