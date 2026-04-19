import type { Metadata } from "next";
import FeasibilityStudyPage from "@/components/feasibility/FeasibilityStudyPage";
import { getFeaturedFeasibilityPosts, getFeasibilityPosts } from "@/sanity/queries";
import type { FeasibilityPost } from "@/types";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Solar Feasibility Study",
    description:
      "Technical and financial solar feasibility analysis with site assessment, savings projection, and custom system recommendations.",
    alternates: {
      canonical: `/${locale}/feasibility-study`,
    },
  };
}

export default async function FeasibilityStudyRoute({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;

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

  return (
    <FeasibilityStudyPage
      posts={posts}
      featuredPosts={featuredPosts}
      locale={locale}
    />
  );
}
