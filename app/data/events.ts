/**
 * muhurtham.app — event data
 * -----------------------------------------------------------------------------
 * ONE array, edit here. Each entry drives a card in the grid.
 *
 * Card visual priority:  image  →  lottieSrc  →  static SVG motif
 *
 * • `image`      — optional photo/artwork under /public (e.g. the kalyanam
 *                  images in /public/kalyanams). Shown first when present.
 * • `lottieSrc`  — optional path to a .lottie or .json file in /public.
 *                  Drop a file in `public/lottie/<id>.lottie` and set it here.
 * • `motif`      — built-in ceremonial SVG (components/motifs), the final
 *                  graceful fallback if image + lottie are absent or fail.
 * • `accent`     — per-kalyanam gradient identity (from → to, plus glow).
 */

export type MotifId = "siva" | "rama" | "venkatesha";

export interface Kalyanam {
  id: MotifId;
  teluguTitle: string;
  englishTitle: string;
  description: string;
  /** Path under /public, e.g. "/kalyanams/siva.png". Optional. */
  image?: string;
  /** Path under /public, e.g. "/lottie/siva.lottie". Optional. */
  lottieSrc?: string;
  motif: MotifId;
  accent: {
    /** gradient start (deep) */
    from: string;
    /** gradient end (gold) */
    to: string;
    /** soft glow colour behind the motif */
    glow: string;
  };
}

export const BRAND = {
  logo: "/brand/muhurtham-logo.png",
  telugu: "ముహూర్తం",
  latin: "muhurtham.app",
  kickerTelugu: "శుభకార్యాలు",
  taglineTelugu: "శుభ ముహూర్తం మీ చేతివేళ్ల చెంత",
  taglineEnglish: "Auspicious moments, booked with ease",
  comingSoonTelugu: "త్వరలో",
  comingSoonEnglish: "Coming soon",
} as const;

export const KALYANAMS: Kalyanam[] = [
  {
    id: "siva",
    teluguTitle: "శివ కళ్యాణం",
    englishTitle: "Siva Kalyanam",
    description:
      "Book the celestial wedding of Siva & Parvati with ritual precision.",
    image: "/kalyanams/siva.png",
    // lottieSrc: "/lottie/siva.lottie",
    motif: "siva",
    accent: {
      from: "#2e2a6b", // cool indigo
      to: "#d99a2b", // saffron gold
      glow: "rgba(83, 78, 168, 0.28)",
    },
  },
  {
    id: "rama",
    teluguTitle: "రామ కళ్యాణం",
    englishTitle: "Rama Kalyanam",
    description:
      "Arrange Sita Rama Kalyanam — kodanda, lotus and a rain of petals.",
    image: "/kalyanams/rama.png",
    // lottieSrc: "/lottie/rama.lottie",
    motif: "rama",
    accent: {
      from: "#1f5c3a", // temple green
      to: "#d99a2b",
      glow: "rgba(46, 123, 79, 0.26)",
    },
  },
  {
    id: "venkatesha",
    teluguTitle: "వేంకటేశ కళ్యాణం",
    englishTitle: "Venkatesha Kalyanam",
    description:
      "Plan Srinivasa Kalyanam — tirunamam, conch, chakra and lamp glow.",
    image: "/kalyanams/venkatesha.png",
    // lottieSrc: "/lottie/venkatesha.lottie",
    motif: "venkatesha",
    accent: {
      from: "#7a1f2b", // deep maroon
      to: "#d99a2b",
      glow: "rgba(122, 31, 43, 0.3)",
    },
  },
];
