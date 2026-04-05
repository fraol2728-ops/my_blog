import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";
import { GradientBackground } from "@/components/gradient";

import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "SolarPeak | Premium Solar Energy Solutions",
    template: "%s | SolarPeak",
  },
  description:
    "SolarPeak delivers residential and commercial solar installation, maintenance, and clean energy consulting services.",
  keywords: [
    "solar installation",
    "solar company",
    "renewable energy",
    "commercial solar systems",
    "residential solar panels",
  ],
  openGraph: {
    title: "SolarPeak | Premium Solar Energy Solutions",
    description:
      "Lower energy costs with expertly designed solar systems for homes and businesses.",
    url: "https://solarpeak.example",
    siteName: "SolarPeak",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SolarPeak | Premium Solar Energy Solutions",
    description:
      "Lower energy costs with expertly designed solar systems for homes and businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GradientBackground />
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
