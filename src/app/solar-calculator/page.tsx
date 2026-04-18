import type { Metadata } from "next";
import SolarCalculatorPage from "@/components/solar/SolarCalculatorPage";

export const metadata: Metadata = {
  title: "Solar Savings Calculator",
  description:
    "Estimate your solar system size, installation cost, and expected savings with our smart solar calculator.",
  alternates: {
    canonical: "/solar-calculator",
  },
};

export default function SolarCalculatorRoute() {
  return <SolarCalculatorPage />;
}
