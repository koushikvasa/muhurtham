"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BRAND } from "@/app/data/events";
import Torana from "@/app/components/Torana";
import Petals from "@/app/components/Petals";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <header className="relative isolate overflow-hidden px-5 pb-10 pt-[clamp(1.5rem,6vw,4rem)]">
      <Torana />
      <Petals />

      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center pt-[clamp(4rem,14vw,8rem)] text-center"
      >
        {/* kicker */}
        <motion.p
          variants={reduce ? undefined : rise}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-gold)]/50 bg-[color:var(--color-cream)]/70 px-4 py-1.5 text-[length:var(--text-small)] uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]"
        >
          Andhra Pradesh · కళ్యాణం
        </motion.p>

        {/* Brand — Telugu is the hero */}
        <motion.h1
          variants={reduce ? undefined : rise}
          lang="te"
          className="font-telugu font-extrabold leading-[0.95] text-[color:var(--color-maroon)]"
          style={{ fontSize: "var(--text-brand)" }}
        >
          {BRAND.telugu}
        </motion.h1>

        <motion.p
          variants={reduce ? undefined : rise}
          className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] italic text-[color:var(--color-gold)]"
        >
          {BRAND.latin}
        </motion.p>

        {/* gold divider */}
        <motion.span
          variants={reduce ? undefined : rise}
          className="rule-gold my-6 block h-px w-40"
        />

        {/* Tagline (Telugu primary, English secondary) */}
        <motion.p
          variants={reduce ? undefined : rise}
          lang="te"
          className="font-telugu text-[length:var(--text-lede)] text-[color:var(--color-ink)]"
        >
          {BRAND.taglineTelugu}
        </motion.p>
        <motion.p
          variants={reduce ? undefined : rise}
          className="mt-1 text-[length:var(--text-body)] text-[color:var(--color-ink-soft)]"
        >
          {BRAND.taglineEnglish}
        </motion.p>

        {/* Coming soon */}
        <motion.div
          variants={reduce ? undefined : rise}
          className="mt-8 flex items-center gap-3"
        >
          <span className="tap-target inline-flex items-center gap-2 rounded-full bg-[color:var(--color-maroon)] px-6 py-3 text-[color:var(--color-cream)] shadow-[0_10px_30px_-12px_rgba(122,31,43,0.8)]">
            <span
              aria-hidden
              className={`h-2.5 w-2.5 rounded-full bg-[color:var(--color-saffron)] ${
                reduce ? "" : "animate-pulse"
              }`}
            />
            <span lang="te" className="font-telugu text-lg font-semibold">
              {BRAND.comingSoonTelugu}
            </span>
            <span aria-hidden className="opacity-50">
              /
            </span>
            <span>{BRAND.comingSoonEnglish}</span>
          </span>
        </motion.div>
      </motion.div>
    </header>
  );
}
