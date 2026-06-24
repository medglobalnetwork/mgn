"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Using June 24, 2026 as epoch so it starts fresh at ~15 days for you now
    const epoch = new Date("2026-06-24T00:00:00Z").getTime();
    const intervalMs = 15 * 24 * 60 * 60 * 1000;
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const elapsed = now - epoch;
      const currentInterval = Math.floor(elapsed / intervalMs);
      const nextIntervalEnd = epoch + (currentInterval + 1) * intervalMs;
      
      const difference = nextIntervalEnd - now;
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (!mounted) return <div className="h-[90px] mt-8 w-full"></div>;

  return (
    <div className="flex flex-col gap-3 mt-8">
      <div className="text-xs font-bold text-[#183670] uppercase tracking-wider flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
        </span>
        Early Access Closing In:
      </div>
      <div className="flex items-center gap-2 sm:gap-4 justify-start">
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 min-w-[50px] sm:min-w-[60px]">
          <span className="text-lg sm:text-xl font-black text-[#0B1B3D] tabular-nums">{formatNumber(timeLeft.days)}</span>
          <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Days</span>
        </div>
        <span className="text-xl sm:text-2xl font-bold text-gray-300">:</span>
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 min-w-[50px] sm:min-w-[60px]">
          <span className="text-lg sm:text-xl font-black text-[#0B1B3D] tabular-nums">{formatNumber(timeLeft.hours)}</span>
          <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Hours</span>
        </div>
        <span className="text-xl sm:text-2xl font-bold text-gray-300">:</span>
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 min-w-[50px] sm:min-w-[60px]">
          <span className="text-lg sm:text-xl font-black text-[#0B1B3D] tabular-nums">{formatNumber(timeLeft.minutes)}</span>
          <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Mins</span>
        </div>
        <span className="text-xl sm:text-2xl font-bold text-gray-300 hidden sm:block">:</span>
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 min-w-[50px] sm:min-w-[60px] hidden sm:flex">
          <span className="text-lg sm:text-xl font-black text-[#00A67E] tabular-nums">{formatNumber(timeLeft.seconds)}</span>
          <span className="text-[10px] sm:text-xs font-bold text-[#00A67E] uppercase">Secs</span>
        </div>
      </div>
    </div>
  );
}
