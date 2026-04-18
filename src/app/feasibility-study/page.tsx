import type { Metadata } from "next";
import FeasibilityStudyPage from "@/components/feasibility/FeasibilityStudyPage";
import { getFeaturedFeasibilityPosts, getFeasibilityPosts } from "@/sanity/queries";
import type { FeasibilityPost } from "@/types";

export const metadata: Metadata = {
  title: "Solar Feasibility Study",
  description:
    "Technical and financial solar feasibility analysis with site assessment, savings projection, and custom system recommendations.",
  alternates: {
    canonical: "/feasibility-study",
  },
};

export default async function FeasibilityStudyRoute() {
  let posts: FeasibilityPost[] = [];
  let featuredPosts: FeasibilityPost[] = [];

  try {
    [posts, featuredPosts] = await Promise.all([
      getFeasibilityPosts(),
      getFeaturedFeasibilityPosts(3),
    ]);
  } catch {
    posts = [];
    featuredPosts = [];
  }

  return <FeasibilityStudyPage posts={posts} featuredPosts={featuredPosts} />;
}
