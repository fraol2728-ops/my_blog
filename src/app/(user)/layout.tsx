import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";
import { GradientBackground } from "@/components/gradient";

import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "SolarPeak | Solar Energy Solutions",
  description:
    "SolarPeak delivers residential and commercial solar installation, maintenance, and clean energy consulting services.",
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
      <main className="pt-24 sm:pt-28">{children}</main>
      <Footer />
    </>
  );
}
