"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The ONE shared signature: a soft gold torana (toranam) arch spanning the
 * hero. The twin gold ropes draw themselves in on load, then a dense mango-leaf
 * garland drops in leaf-by-leaf with marigold accents. Collapses to a clean
 * static arch under prefers-reduced-motion.
 */

// Two cubic bezier segments describing the arch (viewBox 0 0 1000 240).
const SEG1 = [
  [40, 214],
  [40, 78],
  [300, 30],
  [500, 30],
] as const;
const SEG2 = [
  [500, 30],
  [700, 30],
  [960, 78],
  [960, 214],
] as const;

function cubic(t: number, p: readonly (readonly number[])[], axis: 0 | 1) {
  const u = 1 - t;
  return (
    u * u * u * p[0][axis] +
    3 * u * u * t * p[1][axis] +
    3 * u * t * t * p[2][axis] +
    t * t * t * p[3][axis]
  );
}

// Sample leaf anchor points evenly across both segments.
const LEAVES: { x: number; y: number; len: number; marigold: boolean }[] = [];
const PER = 15;
for (const seg of [SEG1, SEG2]) {
  for (let i = 0; i <= PER; i++) {
    const t = i / PER;
    // skip the shared join on the second pass
    if (seg === SEG2 && i === 0) continue;
    const x = cubic(t, seg, 0);
    const y = cubic(t, seg, 1);
    // longer leaves near the crown, shorter down the sides
    const len = 30 - ((y - 30) / 184) * 13;
    LEAVES.push({ x, y, len, marigold: (LEAVES.length + 1) % 3 === 0 });
  }
}

export default function Torana() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto w-full max-w-[1180px]"
    >
      <svg
        viewBox="0 0 1000 240"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <linearGradient id="torana-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b8842a" />
            <stop offset="25%" stopColor="#e4c477" />
            <stop offset="50%" stopColor="#d99a2b" />
            <stop offset="75%" stopColor="#e4c477" />
            <stop offset="100%" stopColor="#b8842a" />
          </linearGradient>
          <linearGradient id="torana-leaf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f8a58" />
            <stop offset="100%" stopColor="#1f5c3a" />
          </linearGradient>
          <radialGradient id="torana-marigold" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor="#f2c14e" />
            <stop offset="100%" stopColor="#d97a1e" />
          </radialGradient>
        </defs>

        {/* Twin gold ropes of the arch */}
        <motion.path
          d="M40 214 C 40 78, 300 30, 500 30 C 700 30, 960 78, 960 214"
          fill="none"
          stroke="url(#torana-gold)"
          strokeWidth="7"
          strokeLinecap="round"
          initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
          animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M40 214 C 40 92, 300 44, 500 44 C 700 44, 960 92, 960 214"
          fill="none"
          stroke="url(#torana-gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.65"
          initial={reduce ? undefined : { pathLength: 0 }}
          animate={reduce ? undefined : { pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Mango-leaf garland hanging beneath the arch */}
        {LEAVES.map((lf, i) => {
          const delay = 0.7 + i * 0.03;
          return (
            <motion.g
              key={i}
              initial={reduce ? undefined : { opacity: 0, y: -6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay, ease: "easeOut" }}
            >
              {/* leaf */}
              <path
                d={`M${lf.x} ${lf.y}
                    C ${lf.x - 6} ${lf.y + lf.len * 0.42},
                      ${lf.x - 4.5} ${lf.y + lf.len},
                      ${lf.x} ${lf.y + lf.len}
                    C ${lf.x + 4.5} ${lf.y + lf.len},
                      ${lf.x + 6} ${lf.y + lf.len * 0.42},
                      ${lf.x} ${lf.y} Z`}
                fill="url(#torana-leaf)"
              />
              {/* central vein */}
              <line
                x1={lf.x}
                y1={lf.y + 2}
                x2={lf.x}
                y2={lf.y + lf.len - 2}
                stroke="#cfe6d4"
                strokeWidth="0.8"
                opacity="0.7"
              />
              {/* marigold accent every 3rd anchor */}
              {lf.marigold && (
                <motion.circle
                  cx={lf.x}
                  cy={lf.y + lf.len + 5}
                  r="4"
                  fill="url(#torana-marigold)"
                  animate={reduce ? undefined : { y: [0, 2.5, 0] }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Crown ornament at the apex */}
        <motion.g
          initial={reduce ? undefined : { opacity: 0, scale: 0.6 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.3, ease: "backOut" }}
          style={{ transformOrigin: "500px 30px" }}
        >
          <path
            d="M500 14 L506 30 L500 40 L494 30 Z"
            fill="url(#torana-gold)"
          />
          <circle cx="500" cy="12" r="3.5" fill="url(#torana-marigold)" />
        </motion.g>
      </svg>
    </div>
  );
}
