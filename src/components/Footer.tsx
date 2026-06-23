"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FOOTER_NAV } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/auth') || pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="w-full bg-[#183670] py-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <img src="/logo.svg" alt="MGN Logo" className="h-8 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs font-medium mb-6">
              Med Global Network (MGN) is India's unified healthcare ecosystem connecting professionals, students, organizations & businesses.
            </p>
            <p className="text-white/50 text-xs font-medium">
              &copy; {new Date().getFullYear()} Med Global Network (MGN). All rights reserved.
            </p>
          </div>

          {/* Dynamic Links mapped from config */}
          {FOOTER_NAV.map((group, index) => (
            <div key={index} className="flex flex-col gap-2.5">
              <h4 className="font-bold text-white mb-1 text-sm">{group.title}</h4>
              {group.items.map((item, idx) => (
                <Link key={idx} href={item.href} className="text-white/70 hover:text-white text-sm transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          ))}

          {/* Contact Us Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-white mb-1 text-sm">Contact Us</h4>
            <a href={`mailto:${siteConfig.contact.email}`} className="text-white/70 hover:text-white text-sm transition-colors">{siteConfig.contact.email}</a>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="text-white/70 hover:text-white text-sm transition-colors">{siteConfig.contact.phone}</a>
            
            <div className="flex gap-4 mt-2">
               <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                 <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="object-contain w-6 h-6" />
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                 <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} className="object-contain w-6 h-6" />
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                 <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} className="object-contain w-6 h-6" />
               </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
