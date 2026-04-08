import FeaturedPost from "@/components/news/FeaturedPost";
import NewsGrid from "@/components/news/NewsGrid";
import NewsHero from "@/components/news/NewsHero";
import Newsletter from "@/components/news/Newsletter";
import { getCategories, getFilteredPosts } from "@/sanity/queries";
import { Post, PostCategory } from "@/types";

export default async function NewsPage() {
  const [postsResponse, categoriesResponse] = await Promise.allSettled([
    getFilteredPosts({ quantity: 50 }),
    getCategories(),
  ]);

  const posts: Post[] = postsResponse.status === "fulfilled" ? postsResponse.value ?? [] : [];
  const categories: PostCategory[] =
    categoriesResponse.status === "fulfilled" ? categoriesResponse.value ?? [] : [];

  const featuredPost = posts[0];
  const nonFeaturedPosts = posts.slice(1);

  return (
    <div className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NewsHero />

        <section className="mt-10">
          {featuredPost ? (
            <FeaturedPost post={featuredPost} />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No news articles published yet.
            </div>
          )}
        </section>

        <NewsGrid posts={nonFeaturedPosts} categories={categories} />

        <section className="mt-16">
          <Newsletter />
        </section>
      </div>
    </div>
  );
}
