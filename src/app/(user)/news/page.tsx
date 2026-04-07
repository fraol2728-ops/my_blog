import BlogCard from "@/components/BlogCard";
import FeaturedPost from "@/components/FeaturedPost";
import NewsletterSection from "@/components/NewsletterSection";
import { getCategories, getFilteredPosts } from "@/sanity/queries";
import { Post, PostCategory } from "@/types";
import Link from "next/link";

interface NewsPageProps {
  searchParams?: Promise<{
    category?: string | string[];
    q?: string | string[];
  }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = (await searchParams) || {};
  const categoryParam = params?.category;
  const keywordParam = params?.q;
  const selectedCategory = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const keyword = Array.isArray(keywordParam) ? keywordParam[0] : keywordParam;

  const [postsResponse, categoriesResponse] = await Promise.allSettled([
    getFilteredPosts({ category: selectedCategory, keyword, quantity: 24 }),
    getCategories(),
  ]);

  const posts: Post[] = postsResponse.status === "fulfilled" ? postsResponse.value ?? [] : [];
  const categories: PostCategory[] =
    categoriesResponse.status === "fulfilled" ? categoriesResponse.value ?? [] : [];

  const featuredPost = posts[0];
  const latestPosts = posts.slice(1);

  return (
    <div className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <section className="py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">News</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            Latest Solar Energy News & Insights
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Stay updated with industry trends, innovations, and company updates.
          </p>
        </section>

        {categories.length > 0 && (
          <section className="mb-14">
            <div className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-1">
              <Link
                href={keyword ? `/news?q=${encodeURIComponent(keyword)}` : "/news"}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                  !selectedCategory
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
                }`}
              >
                All News
              </Link>

              {categories.map((category) => {
                const isActive = selectedCategory === category.slug;

                return (
                  <Link
                    key={category.slug}
                    href={`/news?category=${category.slug}${keyword ? `&q=${encodeURIComponent(keyword)}` : ""}`}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
                    }`}
                  >
                    {category.title}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {featuredPost ? (
          <section>
            <FeaturedPost post={featuredPost} />
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            {keyword
              ? `No news articles found for "${keyword}".`
              : "No news articles found yet."}
          </section>
        )}

        {latestPosts.length > 0 && (
          <section className="mt-16 py-10">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Latest News</h2>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-20">
          <NewsletterSection />
        </section>
      </div>
    </div>
  );
}
