"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

/**
 * A gentle rain of flower petals across the hero, in SVG + Framer Motion
 * (lighter than Lottie). Disabled entirely under prefers-reduced-motion.
 * Deterministic seed -> no hydration mismatch.
 */
const PETAL_COLORS = ["#d99a2b", "#c99a3b", "#e4c477", "#a83244"];

function seeded(i: number) {
  // simple deterministic pseudo-random from index
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

export default function Petals({ count = 14 }: { count?: number }) {
  const reduce = useReducedMotion();

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${Math.round(seeded(i) * 100)}%`,
        size: 8 + Math.round(seeded(i + 100) * 12),
        delay: seeded(i + 200) * 8,
        duration: 9 + seeded(i + 300) * 8,
        drift: (seeded(i + 400) - 0.5) * 120,
        rotate: Math.round(seeded(i + 500) * 360),
        color: PETAL_COLORS[i % PETAL_COLORS.length],
      })),
    [count],
  );

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {petals.map((p, i) => (
        <motion.svg
          key={i}
          width={p.size}
          height={p.size}
          viewBox="0 0 20 20"
          className="absolute -top-8"
          style={{ left: p.left }}
          initial={{ y: -40, opacity: 0, rotate: p.rotate }}
          animate={{
            y: ["-6vh", "108vh"],
            x: [0, p.drift, 0],
            opacity: [0, 0.9, 0.9, 0],
            rotate: [p.rotate, p.rotate + 220],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        >
          {/* single teardrop petal */}
          <path
            d="M10 1 C4 6 4 14 10 19 C16 14 16 6 10 1 Z"
            fill={p.color}
            opacity="0.85"
          />
        </motion.svg>
      ))}
    </div>
  );
}
