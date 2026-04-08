import FeaturedPost from "@/components/news/FeaturedPost";
import NewsGrid from "@/components/news/NewsGrid";
import NewsHero from "@/components/news/NewsHero";
import Newsletter from "@/components/news/Newsletter";
import { getAllPosts, getCategories } from "@/sanity/queries";
import { Post, PostCategory } from "@/types";
import { getMessages } from "@/i18n/get-messages";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  return pageMetadata({
    locale: locale as AppLocale,
    path: "/news",
    title: "Xyberosec Newsroom and Cybersecurity Updates Hub",
    description:
      "Stay current with Xyberosec cybersecurity updates, incident trends, and expert guidance to improve governance, detection, and response readiness.",
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale as AppLocale);

  const [postsResponse, categoriesResponse] = await Promise.allSettled([
    getAllPosts(50),
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
              {t.news.empty}
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
