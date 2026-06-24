"use client";

import React from "react";
import { Stethoscope, Activity, Heart, Cross, ShieldPlus, Syringe } from "lucide-react";
import LogoLoop from "./LogoLoop";

const hospitals = [
  { name: "Apollo Hospitals", icon: Activity },
  { name: "Fortis Healthcare", icon: Heart },
  { name: "Max Healthcare", icon: Stethoscope },
  { name: "Medanta", icon: ShieldPlus },
  { name: "AIIMS", icon: Cross },
  { name: "Manipal Hospitals", icon: Syringe },
  { name: "Narayana Health", icon: Heart },
  { name: "Aster DM", icon: Activity },
];

export default function HospitalLogos() {
  const logoItems = hospitals.map(h => {
    const Icon = h.icon;
    return {
      node: (
        <div className="flex items-center gap-3 px-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-gray-800 tracking-tight whitespace-nowrap">{h.name}</span>
        </div>
      )
    };
  });

  return (
    <div className="w-full py-10 bg-gray-50 border-b border-gray-200 overflow-hidden flex flex-col items-center justify-center">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Trusted By Leading Healthcare Organizations</p>
      
      <div className="relative w-full">
        <LogoLoop 
          logos={logoItems} 
          speed={80} 
          direction="left" 
          width="100%"
          gap={0}
        />
      </div>
    </div>
  );
}
