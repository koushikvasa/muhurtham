"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { KALYANAMS } from "@/app/data/events";
import EventCard from "@/app/components/EventCard";

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

export default function EventGrid() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="events-heading"
      className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-6"
    >
      <div className="mb-10 text-center">
        <h2
          id="events-heading"
          lang="te"
          className="font-telugu font-bold text-[color:var(--color-maroon)]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          కళ్యాణ సేవలు
        </h2>
        <p className="mt-1 font-[family-name:var(--font-display)] italic text-[color:var(--color-ink-soft)] text-[length:var(--text-lede)]">
          Kalyanam services launching soon
        </p>
      </div>

      {/* single column on mobile, auto-fit 3-up on tablet/desktop */}
      <motion.div
        variants={reduce ? undefined : grid}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {KALYANAMS.map((item) => (
          <EventCard key={item.id} item={item} />
        ))}
      </motion.div>
    </section>
  );
}
