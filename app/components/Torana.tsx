"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The ONE shared signature: a soft gold torana (garland arch) spanning the
 * hero. The arch draws itself in on load; hanging mango-leaf garlands and
 * bells stagger in beneath it. Everything collapses to a static state under
 * prefers-reduced-motion.
 */
export default function Torana() {
  const reduce = useReducedMotion();

  // hang positions across the span
  const hangs = [60, 170, 280, 390, 500, 610, 720, 830, 940];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto w-full max-w-[1100px]"
    >
      <svg
        viewBox="0 0 1000 240"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <linearGradient id="torana-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c99a3b" />
            <stop offset="25%" stopColor="#e4c477" />
            <stop offset="50%" stopColor="#d99a2b" />
            <stop offset="75%" stopColor="#e4c477" />
            <stop offset="100%" stopColor="#c99a3b" />
          </linearGradient>
          <radialGradient id="torana-bell" cx="0.5" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#e4c477" />
            <stop offset="100%" stopColor="#b8842a" />
          </radialGradient>
        </defs>

        {/* Main arch — two parallel gold ropes */}
        <motion.path
          d="M20 210 C 20 70, 300 20, 500 20 C 700 20, 980 70, 980 210"
          fill="none"
          stroke="url(#torana-gold)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
          animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M20 210 C 20 84, 300 34, 500 34 C 700 34, 980 84, 980 210"
          fill="none"
          stroke="url(#torana-gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
          initial={reduce ? undefined : { pathLength: 0 }}
          animate={reduce ? undefined : { pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Hanging garlands: mango-leaf pair + a bell, staggered in */}
        {hangs.map((x, i) => {
          // follow the arch curve roughly for the anchor y
          const t = x / 1000;
          const y = 210 - Math.sin(t * Math.PI) * 176;
          const len = 26 + Math.sin(t * Math.PI) * 26;
          return (
            <motion.g
              key={x}
              initial={reduce ? undefined : { opacity: 0, y: -8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.9 + i * 0.06,
                ease: "easeOut",
              }}
            >
              {/* mango leaves */}
              <path
                d={`M${x} ${y} q -9 ${len * 0.5} 0 ${len}`}
                fill="none"
                stroke="#2f6b45"
                strokeWidth="3"
                opacity="0.8"
              />
              <path
                d={`M${x} ${y} q 9 ${len * 0.5} 0 ${len}`}
                fill="none"
                stroke="#3a7d52"
                strokeWidth="3"
                opacity="0.8"
              />
              {/* bell */}
              <motion.g
                style={{ originX: `${x}px`, originY: `${y + len}px` }}
                animate={
                  reduce
                    ? undefined
                    : { rotate: [-6, 6, -6] }
                }
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  d={`M${x - 5} ${y + len} q 5 12 10 0 Z`}
                  fill="url(#torana-bell)"
                />
                <circle cx={x} cy={y + len + 9} r="2" fill="#8a5a1e" />
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
