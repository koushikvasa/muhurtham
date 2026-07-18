import type { Metadata, Viewport } from "next";
import { Noto_Sans_Telugu, Fraunces } from "next/font/google";
import "./globals.css";

// Telugu is the visual hero of the brand — load a wide weight range.
const notoTelugu = Noto_Sans_Telugu({
  variable: "--font-telugu",
  subsets: ["telugu", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Warm, characterful display serif for the Latin secondary type.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://muhurtham.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ముహూర్తం · muhurtham.app — త్వరలో / Coming soon",
  description:
    "ముహూర్తం — Andhra Pradesh's event-management app for kalyanam & muhurtham bookings. Siva, Rama & Venkatesha Kalyanam. Coming soon / త్వరలో.",
  keywords: [
    "muhurtham",
    "kalyanam",
    "Telugu",
    "Andhra Pradesh",
    "event management",
    "శివ కళ్యాణం",
    "రామ కళ్యాణం",
    "వేంకటేశ కళ్యాణం",
  ],
  openGraph: {
    title: "ముహూర్తం · muhurtham.app",
    description:
      "Andhra Pradesh's kalyanam & muhurtham booking app. Coming soon / త్వరలో.",
    url: SITE_URL,
    siteName: "muhurtham.app",
    locale: "te_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#7A1F2B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables env(safe-area-inset-*) on notched phones
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="te"
      className={`${notoTelugu.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
