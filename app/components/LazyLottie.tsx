"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

// Code-split: this chunk is only fetched the first time a <DotLottie> actually
// renders — which we gate behind IntersectionObserver below.
const DotLottie = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((m) => ({
      default: m.DotLottieReact,
    })),
  { ssr: false },
);

interface LazyLottieProps {
  /** Path to a .lottie / .json under /public. If absent -> fallback. */
  src?: string;
  /** Static SVG motif shown before load, on reduced-motion, or on error. */
  fallback: ReactNode;
  className?: string;
}

/**
 * Renders a Lottie animation only when:
 *   1. a `src` is provided,
 *   2. the element has scrolled into view (IntersectionObserver), and
 *   3. the user has NOT requested reduced motion.
 * Otherwise it shows the static SVG `fallback` — including if the file 404s.
 */
export default function LazyLottie({
  src,
  fallback,
  className,
}: LazyLottieProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!src || reduce) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, reduce]);

  const showLottie = Boolean(src) && inView && !reduce && !failed;

  return (
    <div ref={ref} className={className}>
      {showLottie ? (
        <DotLottie
          src={src as string}
          autoplay
          loop
          className="h-full w-full"
          // dotLottie surfaces load errors via onError -> graceful fallback
          onError={() => setFailed(true)}
        />
      ) : (
        fallback
      )}
    </div>
  );
}
