import Container from "@/components/container";
import PostList, { PostListItem } from "@/components/post-list";
import { getAllPosts } from "@/sanity/queries";

export default async function BlogPage() {
  const posts: PostListItem[] | null = await getAllPosts(12);

  return (
    <div className="overflow-hidden pb-24">
      <Container className="mt-16">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          SolarPeak Blog
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-gray-950 sm:text-6xl">
          Latest News & Insights
        </h1>
        <p className="mt-6 max-w-3xl text-base text-gray-600 sm:text-lg">
          Explore industry trends, practical solar guidance, and project
          highlights from our team.
        </p>

        <div className="mt-10">
          <PostList posts={posts} />
        </div>
      </Container>
    </div>
  );
}
