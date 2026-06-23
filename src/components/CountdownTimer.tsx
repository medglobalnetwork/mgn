"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
}

export default function CountdownTimer({ days = 12, hours = 8, minutes = 22 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days, hours, minutes, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2 sm:gap-4 justify-center sm:justify-start">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 min-w-[60px]">
        <span className="text-xl sm:text-2xl font-black text-[#0B1B3D] tabular-nums">{formatNumber(timeLeft.days)}</span>
        <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Days</span>
      </div>
      <span className="text-2xl font-bold text-gray-300">:</span>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 min-w-[60px]">
        <span className="text-xl sm:text-2xl font-black text-[#0B1B3D] tabular-nums">{formatNumber(timeLeft.hours)}</span>
        <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Hours</span>
      </div>
      <span className="text-2xl font-bold text-gray-300">:</span>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 min-w-[60px]">
        <span className="text-xl sm:text-2xl font-black text-[#0B1B3D] tabular-nums">{formatNumber(timeLeft.minutes)}</span>
        <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">Mins</span>
      </div>
      <span className="text-2xl font-bold text-gray-300 hidden sm:block">:</span>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2 min-w-[60px] hidden sm:flex">
        <span className="text-xl sm:text-2xl font-black text-[#00A67E] tabular-nums">{formatNumber(timeLeft.seconds)}</span>
        <span className="text-[10px] sm:text-xs font-bold text-[#00A67E] uppercase">Secs</span>
      </div>
    </div>
  );
}
