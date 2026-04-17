import type { Metadata } from "next";
import FeasibilityStudyPage from "@/components/feasibility/FeasibilityStudyPage";

export const metadata: Metadata = {
  title: "Solar Feasibility Study",
  description:
    "Technical and financial solar feasibility analysis with site assessment, savings projection, and custom system recommendations.",
  alternates: {
    canonical: "/feasibility-study",
  },
};

export default function FeasibilityStudyRoute() {
  return <FeasibilityStudyPage />;
}
