"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Linkedin, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  // Don't show footer on auth or dashboard routes
  if (pathname.startsWith('/auth') || pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="w-full bg-white py-12 border-t border-gray-100 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 pr-8">
            <Link href="/" className="flex items-center mb-6">
              <img src="/logo.svg" alt="MGN Logo" className="h-8 w-auto object-contain" />
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs font-medium">
              MGN is India's unified healthcare ecosystem connecting professionals, students, organizations & businesses.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-bold text-[#0B1B3D] mb-2 text-sm">Platform</h4>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">About Us</Link>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">Features</Link>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">How It Works</Link>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">Pricing</Link>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-bold text-[#0B1B3D] mb-2 text-sm">For Users</h4>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">For Professionals</Link>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">For Students</Link>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">For Organizations</Link>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">Marketplace</Link>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-bold text-[#0B1B3D] mb-2 text-sm">Resources</h4>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">Blog</Link>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">Help Center</Link>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">Terms & Conditions</Link>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-bold text-[#0B1B3D] mb-2 text-sm">Contact Us</h4>
            <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">{siteConfig.contact.email}</a>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="text-gray-500 hover:text-[#0052CC] text-xs font-medium transition-colors">{siteConfig.contact.phone}</a>
            
            <div className="flex gap-3 mt-4">
               <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0052CC] transition-colors">
                 <Linkedin className="w-5 h-5 fill-current" />
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0052CC] transition-colors">
                 <Instagram className="w-5 h-5" />
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0052CC] transition-colors">
                 <Youtube className="w-5 h-5 fill-current" />
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0052CC] transition-colors">
                 <Twitter className="w-5 h-5 fill-current" />
               </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 flex justify-center items-center">
          <p className="text-gray-400 text-[10px] font-medium">
            &copy; {new Date().getFullYear()} MGN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
