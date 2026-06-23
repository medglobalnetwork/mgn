"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ end, suffix = "", duration = 2 }: CountUpProps) {
  const [inView, setInView] = useState(false);
  
  const springValue = useSpring(0, {
    bounce: 0,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (inView) {
      springValue.set(end);
    }
  }, [inView, end, springValue]);

  const display = useTransform(springValue, (current) => {
    return Math.round(current).toLocaleString() + suffix;
  });

  return (
    <motion.span
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.5 }}
    >
      {display}
    </motion.span>
  );
}
