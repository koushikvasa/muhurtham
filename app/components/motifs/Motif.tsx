import type { MotifId } from "@/app/data/events";

interface MotifProps {
  id: MotifId;
  from: string;
  to: string;
  className?: string;
  title?: string;
}

/**
 * Static, dependency-free ceremonial motifs drawn from GENERIC auspicious
 * symbols (no copyrighted deity artwork). Each has a distinct silhouette so a
 * card reads correctly even before / without its Lottie.
 *
 * Rendered as decorative art -> aria-hidden; the card supplies the label.
 */
export default function Motif({ id, from, to, className, title }: MotifProps) {
  const gid = `motif-grad-${id}`;
  const sid = `motif-soft-${id}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={sid} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={to} stopOpacity="0.9" />
          <stop offset="100%" stopColor={from} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Shared auspicious ring */}
      <circle
        cx="100"
        cy="100"
        r="82"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="1.5"
        strokeDasharray="2 7"
        opacity="0.55"
      />

      {id === "siva" && <Siva grad={`url(#${gid})`} soft={`url(#${sid})`} />}
      {id === "rama" && <Rama grad={`url(#${gid})`} soft={`url(#${sid})`} />}
      {id === "venkatesha" && (
        <Venkatesha grad={`url(#${gid})`} soft={`url(#${sid})`} />
      )}
    </svg>
  );
}

type Sub = { grad: string; soft: string };

/* Siva — crescent + trishula (trident) + damaru (drum) */
function Siva({ grad, soft }: Sub) {
  return (
    <g
      fill="none"
      stroke={grad}
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* crescent moon */}
      <path
        d="M62 58 A26 26 0 1 0 62 106 A20 20 0 1 1 62 58 Z"
        fill={soft}
        stroke="none"
        opacity="0.85"
      />
      {/* trishula shaft */}
      <line x1="140" y1="46" x2="140" y2="150" />
      {/* trident prongs */}
      <path d="M122 70 C122 52 130 46 140 46 C150 46 158 52 158 70" />
      <line x1="122" y1="70" x2="122" y2="58" />
      <line x1="158" y1="70" x2="158" y2="58" />
      <line x1="140" y1="46" x2="140" y2="34" />
      {/* damaru (hourglass drum) hanging from shaft */}
      <path d="M128 108 L152 124 M152 108 L128 124" />
      <path d="M126 106 Q140 116 154 106 M126 126 Q140 116 154 126" />
      {/* bindu */}
      <circle cx="140" cy="116" r="2.4" fill={grad} stroke="none" />
    </g>
  );
}

/* Rama — bow (kodanda) + arrow + lotus + petals */
function Rama({ grad, soft }: Sub) {
  return (
    <g
      fill="none"
      stroke={grad}
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* bow arc */}
      <path d="M70 44 Q40 100 70 156" />
      {/* bowstring */}
      <line x1="70" y1="44" x2="70" y2="156" />
      {/* arrow */}
      <line x1="70" y1="100" x2="150" y2="100" />
      <path d="M150 100 L138 93 M150 100 L138 107" />
      <path d="M78 100 L70 94 M78 100 L70 106" />
      {/* lotus below */}
      <g transform="translate(112 138)">
        <path d="M0 6 C-4 -8 4 -8 0 6" fill={soft} stroke="none" />
        <path d="M0 8 C-16 0 -14 -8 0 4 C14 -8 16 0 0 8" />
        <path d="M0 8 C-28 4 -22 -6 -8 2 M0 8 C28 4 22 -6 8 2" />
      </g>
      {/* falling petals */}
      <path d="M96 52 C90 46 100 44 96 56" fill={soft} stroke="none" />
      <path d="M126 66 C120 60 130 58 126 70" fill={soft} stroke="none" />
    </g>
  );
}

/* Venkatesha — tirunamam (namam) + conch + chakra + lamp glow */
function Venkatesha({ grad, soft }: Sub) {
  return (
    <g
      fill="none"
      stroke={grad}
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* tirunamam — twin white feet of the U with central line */}
      <path d="M84 48 C70 96 74 132 88 150" />
      <path d="M116 48 C130 96 126 132 112 150" />
      <path d="M100 60 L100 150" strokeWidth="4.4" stroke={soft} />
      <path d="M84 48 Q100 42 116 48" />
      {/* conch (left) */}
      <g transform="translate(44 150) scale(0.9)">
        <path d="M0 0 C-14 -6 -10 -24 6 -22 C18 -20 16 -6 6 -4 C0 -3 2 -10 6 -12" />
        <path d="M0 0 L-8 6" />
      </g>
      {/* chakra (right) */}
      <g transform="translate(152 132)">
        <circle cx="0" cy="0" r="15" />
        <circle cx="0" cy="0" r="4" fill={grad} stroke="none" />
        {[0, 45, 90, 135].map((a) => (
          <line
            key={a}
            x1={-15 * Math.cos((a * Math.PI) / 180)}
            y1={-15 * Math.sin((a * Math.PI) / 180)}
            x2={15 * Math.cos((a * Math.PI) / 180)}
            y2={15 * Math.sin((a * Math.PI) / 180)}
          />
        ))}
      </g>
      {/* lamp glow at base */}
      <path d="M92 166 Q100 150 108 166 Z" fill={soft} stroke="none" />
      <path d="M100 150 Q100 142 100 140" />
    </g>
  );
}
