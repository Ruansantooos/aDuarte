"use client";

import { useRef, ReactNode, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface LinkButtonProps {
  href: string;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  delay?: number;
  glow?: string; // cor hex, ex: "#3b82f6"
}

export function LinkButton({ href, title, subtitle, icon, delay = 0, glow }: LinkButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct * 15);
    y.set(yPct * 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setActive(false);
  };

  const glowStyle = glow && active
    ? {
        border: `1px solid ${glow}`,
        boxShadow: `0 0 22px 6px ${glow}44, 0 0 8px 2px ${glow}66, inset 0 1px 0 rgba(255,255,255,0.15)`,
        transition: "box-shadow 0.2s ease, border 0.2s ease",
      }
    : glow
    ? { transition: "box-shadow 0.2s ease, border 0.2s ease" }
    : undefined;

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 400)}
      onClick={() => {
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("trackCustom", "LinkClick", {
            button_name: title,
            url: href,
          });
        }
      }}
      style={{ x: mouseXSpring, y: mouseYSpring, ...glowStyle }}
      className="relative flex items-center justify-between w-full p-4 rounded-[2rem] liquid-glass group decoration-transparent overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
      />

      <div className="flex items-center gap-4 relative z-10 w-full">
        <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-white/5 text-zinc-200 border border-white/10 group-hover:bg-white/10 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <div className="flex flex-col text-left flex-1">
          <span className="text-lg font-medium tracking-tight text-zinc-100 mb-0.5 group-hover:text-white transition-colors">
            {title}
          </span>
          {subtitle && (
            <span className="text-sm text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white/20 transition-all duration-300 transform group-hover:-translate-y-[2px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" className="text-zinc-300 group-hover:text-white transition-colors">
          <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
        </svg>
      </div>
    </motion.a>
  );
}
