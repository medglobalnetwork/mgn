"use client";

import React from "react";
import { Stethoscope, Activity, Heart, Cross, ShieldPlus, Syringe } from "lucide-react";

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

export default function LogoLoop() {
  return (
    <div className="w-full py-10 bg-gray-50 border-b border-gray-200 overflow-hidden flex flex-col items-center justify-center">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Trusted By Leading Healthcare Organizations</p>
      
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center shrink-0">
          {[...hospitals, ...hospitals].map((hospital, index) => {
            const Icon = hospital.icon;
            return (
              <div 
                key={index} 
                className="flex items-center gap-3 mx-8 md:mx-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-gray-800 tracking-tight">{hospital.name}</span>
              </div>
            );
          })}
        </div>
        
        {/* Second marquee for seamless infinite scroll */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center shrink-0">
          {[...hospitals, ...hospitals].map((hospital, index) => {
            const Icon = hospital.icon;
            return (
              <div 
                key={index + hospitals.length * 2} 
                className="flex items-center gap-3 mx-8 md:mx-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-gray-800 tracking-tight">{hospital.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
