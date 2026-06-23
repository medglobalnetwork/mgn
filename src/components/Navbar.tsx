"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

import { MAIN_NAV, NavSubGroup } from "@/config/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  if (pathname.startsWith('/auth') || pathname.startsWith('/dashboard')) return null;

  const getLinkClass = (path: string) => 
    pathname === path 
      ? "text-[#183670] relative py-1 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#183670] transition-colors" 
      : "text-gray-600 hover:text-[#183670] relative py-1 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-transparent transition-colors";

  const isGroupActive = (columns: NavSubGroup[]) => 
    columns.some(col => col.items.some(item => pathname === item.href));
  
  const getGroupClass = (columns: NavSubGroup[]) => 
    isGroupActive(columns)
      ? "text-[#183670] relative py-1 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#183670] transition-colors"
      : "text-gray-600 hover:text-[#183670] relative py-1 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-transparent transition-colors";

  const getMobileLinkClass = (path: string) => 
    pathname === path ? "text-[#183670] font-semibold" : "text-gray-500 hover:text-[#183670]";
    
  const getMobileGroupClass = (columns: NavSubGroup[]) => 
    isGroupActive(columns) ? "text-[#183670] font-semibold" : "text-gray-600";

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Announcement Bar */}
      <div className="bg-[#183670] text-white py-1 md:py-1.5 px-3 sm:px-6 lg:px-12 flex flex-row items-center justify-between relative min-h-[36px] overflow-hidden">
        {/* Left Spacer */}
        <div className="w-16 md:w-20 shrink-0 relative z-10"></div>
        
        {/* Absolute Centered Text */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[60%] sm:w-[70%] flex items-center justify-center gap-2">
          <span className="text-[10px] sm:text-[11px] md:text-sm font-bold text-center truncate">🎉 Founding Member Program Open <span className="hidden sm:inline">– Limited Spots Available</span></span>
          <Link href="/auth/signup" className="hidden lg:inline-flex shrink-0 items-center gap-1 bg-white text-[#183670] px-3 py-0.5 rounded-full text-xs hover:bg-blue-50 transition-colors">
            Join Now <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </div>

        {/* Right Content */}
        <div className="shrink-0 flex justify-end relative z-10">
          <div className="scale-[0.75] md:scale-90 origin-right">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <nav ref={navRef} className="bg-white shadow-sm w-full relative">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-1.5 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.svg" alt="MGN Logo" className="h-7 w-auto object-contain" />
          </Link>

          {/* Center Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-6 xl:gap-8 text-[13px] xl:text-sm font-semibold text-gray-600 whitespace-nowrap px-4">
            {/* Dynamic Mega Menus mapped from config */}
            {MAIN_NAV.map((group, index) => (
              <div key={index} className="group relative py-1.5">
                <span className={`flex items-center gap-1 cursor-pointer ${getGroupClass(group.columns)}`}>
                  {group.title}
                  <svg className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-auto bg-white border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex p-6 gap-8 z-50">
                  {group.columns.map((col, cIdx) => (
                    <div key={cIdx} className="flex flex-col min-w-[200px] max-w-[240px]">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">{col.title}</h4>
                      <ul className="flex flex-col gap-3">
                        {col.items.map((item, iIdx) => (
                          <li key={iIdx}>
                            <Link href={item.href} className={`flex items-center gap-2 hover:text-[#183670] transition-colors ${pathname === item.href ? 'text-[#183670] font-bold' : 'text-gray-600 font-medium'}`}>
                              <span className="truncate">{item.name}</span>
                              {item.badge && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${item.badgeColor || 'bg-gray-100 text-gray-600'}`}>
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/pricing" className={getLinkClass("/pricing")}>
              Pricing
            </Link>
          </div>

          {/* Right Desktop Auth Actions */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-[13px] xl:text-sm font-semibold whitespace-nowrap shrink-0">
            {/* Search Button */}
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-500 hover:text-[#183670] transition-colors rounded-full hover:bg-gray-50 focus:outline-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
            

             {user ? (
                <div className="flex items-center gap-4">
                   <Link href="/dashboard" className="px-4 py-2 text-gray-600 hover:text-[#183670] font-semibold transition-all">
                     Dashboard
                   </Link>
                   <button onClick={() => logout()} className="text-red-600 hover:text-red-700 font-semibold">Logout</button>
                </div>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-gray-600 hover:text-[#183670] transition-all">
                  Login
                </Link>
                <Link href="/auth/signup" className="rounded bg-[#183670] px-5 py-2 text-white hover:bg-[#0B1B3D] shadow-sm transition-all flex items-center gap-1">
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-600 max-h-[75vh] overflow-y-auto">
             <Link href="/" className={getMobileLinkClass("/")}>Home</Link>
             <Link href="/about-us" className={getMobileLinkClass("/about-us")}>About Us</Link>
             <Link href="/features" className={getMobileLinkClass("/features")}>Features</Link>
             
             {/* Dynamic Mobile Menu mapped from config */}
             {MAIN_NAV.map((group, index) => (
               <details key={index} className="group" open={isGroupActive(group.columns)}>
                 <summary className={`flex items-center justify-between cursor-pointer list-none ${getMobileGroupClass(group.columns)}`}>
                   <span>{group.title}</span>
                   <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 </summary>
                 <div className="flex flex-col gap-5 mt-4 pl-4 border-l-2 border-gray-100">
                    {group.columns.map((col, cIdx) => (
                      <div key={cIdx}>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{col.title}</h4>
                        <div className="flex flex-col gap-3">
                          {col.items.map((item, iIdx) => (
                            <Link key={iIdx} href={item.href} className={`flex items-center gap-2 ${getMobileLinkClass(item.href)}`}>
                              <span className="truncate">{item.name}</span>
                              {item.badge && (
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ${item.badgeColor || 'bg-gray-100 text-gray-600'}`}>
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                 </div>
               </details>
             ))}
             
             <Link href="/pricing" className={getMobileLinkClass("/pricing")}>Pricing</Link>

             <hr className="my-2" />
             
             {user ? (
                <div className="flex flex-col gap-3">
                  <Link href="/dashboard" className="text-center rounded border border-[#183670] py-2.5 text-[#183670] font-bold">Dashboard</Link>
                  <button onClick={() => logout()} className="text-center rounded bg-red-600 py-2.5 text-white font-bold">Logout</button>
                </div>
             ) : (
               <div className="flex flex-col gap-3">
                 <Link href="/auth/login" className="text-center rounded border border-[#183670] py-2.5 text-[#183670] font-bold">Login</Link>
                 <Link href="/auth/signup" className="text-center rounded bg-[#183670] py-2.5 text-white font-bold">Get Started Free</Link>
               </div>
             )}
          </div>
        )}

        {/* Expandable Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-md py-4 px-6 lg:px-12 z-40">
            <div className="max-w-4xl mx-auto flex items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden px-4">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input 
                type="text" 
                placeholder="Search healthcare professionals, jobs, organizations, or resources..." 
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 py-3 px-3 text-sm text-gray-700"
                autoFocus
              />
              <button className="text-sm font-bold text-white bg-[#183670] px-5 py-2 rounded hover:bg-[#0B1B3D] transition-colors shrink-0">Search</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
