import Hero from "@/app/components/Hero";
import EventGrid from "@/app/components/EventGrid";
import { BRAND } from "@/app/data/events";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Hero />
      <EventGrid />

      <footer className="mt-auto border-t border-[color:var(--color-gold)]/30 px-5 py-8 text-center">
        <p
          lang="te"
          className="font-telugu text-[length:var(--text-body)] text-[color:var(--color-maroon)]"
        >
          {BRAND.telugu}
          <span className="mx-2 text-[color:var(--color-gold)]">·</span>
          <span className="font-[family-name:var(--font-display)] not-italic text-[color:var(--color-ink-soft)]">
            {BRAND.latin}
          </span>
        </p>
        <p className="mt-1 text-[length:var(--text-small)] text-[color:var(--color-ink-soft)]">
          శుభమస్తు · Made for Andhra Pradesh · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
