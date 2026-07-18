"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { Kalyanam } from "@/app/data/events";
import { BRAND } from "@/app/data/events";
import Motif from "@/app/components/motifs/Motif";
import LazyLottie from "@/app/components/LazyLottie";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function EventCard({ item }: { item: Kalyanam }) {
  const reduce = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);
  const { accent } = item;

  const showImage = Boolean(item.image) && !imgFailed;

  const motifFallback = (
    <Motif
      id={item.motif}
      from={accent.from}
      to={accent.to}
      title={`${item.englishTitle} motif`}
      className="h-full w-full drop-shadow-[0_2px_6px_rgba(58,30,18,0.15)]"
    />
  );

  return (
    <motion.article
      variants={cardVariants}
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[color:var(--color-gold)]/40 bg-[color:var(--color-cream)]/80 p-6 shadow-[0_18px_50px_-24px_rgba(58,30,18,0.55)] backdrop-blur-sm sm:p-7"
      style={{
        backgroundImage: `radial-gradient(120% 70% at 50% -10%, ${accent.glow}, transparent 60%)`,
      }}
    >
      {/* corner filigree */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 z-10 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-[color:var(--color-gold)]/50 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-4 z-10 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-[color:var(--color-gold)]/50 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Visual — arched temple frame around the kalyanam image */}
      <div className="relative mx-auto mb-5 w-full max-w-[300px]">
        <div
          aria-hidden
          className="absolute -inset-1 rounded-[1.6rem] blur-xl"
          style={{ background: accent.glow }}
        />
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.4rem] rounded-t-[6rem] border-2 border-[color:var(--color-gold)]/60 bg-[color:var(--color-cream)] shadow-inner"
          style={{
            boxShadow: `inset 0 0 0 3px rgba(251,246,236,0.6), inset 0 0 26px ${accent.glow}`,
          }}
        >
          {showImage ? (
            <Image
              src={item.image as string}
              alt={`${item.englishTitle} — ${item.teluguTitle}`}
              fill
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 300px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => setImgFailed(true)}
            />
          ) : item.lottieSrc ? (
            <div className="flex h-full w-full items-center justify-center p-4">
              <LazyLottie
                src={item.lottieSrc}
                className="h-full w-full"
                fallback={motifFallback}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center p-5">
              {motifFallback}
            </div>
          )}

          {/* gentle gold vignette over the image */}
          {showImage && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[1.4rem] rounded-t-[6rem]"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 0%, transparent 55%, rgba(122,31,43,0.18) 100%)",
              }}
            />
          )}
        </div>
      </div>

      {/* Telugu title — the visual hero of the card */}
      <h3
        lang="te"
        className="text-center font-telugu font-bold leading-tight text-[color:var(--color-maroon)]"
        style={{ fontSize: "var(--text-title)" }}
      >
        {item.teluguTitle}
      </h3>

      {/* English subtitle */}
      <p className="mt-1 text-center font-[family-name:var(--font-display)] italic text-[color:var(--color-ink-soft)] text-[length:var(--text-lede)]">
        {item.englishTitle}
      </p>

      <span aria-hidden className="rule-gold mx-auto my-4 block h-px w-24" />

      {/* One-line placeholder description */}
      <p className="text-center text-[color:var(--color-ink)]/80 text-[length:var(--text-small)]">
        {item.description}
      </p>

      {/* Coming-soon badge */}
      <div className="mt-6 flex justify-center">
        <span className="tap-target inline-flex items-center gap-2 rounded-full border border-[color:var(--color-gold)]/60 bg-[color:var(--color-maroon)] px-5 py-2 text-[color:var(--color-cream)] shadow-sm">
          <span
            aria-hidden
            className={`h-2 w-2 rounded-full bg-[color:var(--color-saffron)] ${
              reduce ? "" : "animate-pulse"
            }`}
          />
          <span lang="te" className="font-telugu font-semibold">
            {BRAND.comingSoonTelugu}
          </span>
          <span aria-hidden className="opacity-50">
            /
          </span>
          <span className="text-[length:var(--text-small)]">
            {BRAND.comingSoonEnglish}
          </span>
        </span>
      </div>
    </motion.article>
  );
}
