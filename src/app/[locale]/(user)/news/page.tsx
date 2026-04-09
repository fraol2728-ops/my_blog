import FeaturedPost from "@/components/news/FeaturedPost";
import NewsGrid from "@/components/news/NewsGrid";
import NewsHero from "@/components/news/NewsHero";
import Newsletter from "@/components/news/Newsletter";
import { getAllPosts, getCategories } from "@/sanity/queries";
import { Post, PostCategory } from "@/types";
import { getMessages } from "@/i18n/get-messages";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { buildBreadcrumbSchema, buildSanityKeywordSignals, pageMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";


export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { q } = await searchParams;

  if (!isValidLocale(locale)) notFound();

  const [postsResponse, categoriesResponse] = await Promise.allSettled([
    getAllPosts(50),
    getCategories(),
  ]);

  const posts: Post[] = postsResponse.status === "fulfilled" ? postsResponse.value ?? [] : [];
  const categories: PostCategory[] =
    categoriesResponse.status === "fulfilled" ? categoriesResponse.value ?? [] : [];
  const sanityKeywords = buildSanityKeywordSignals({ posts, categories });
  const queryKeyword = q?.trim();

  return pageMetadata({
    locale: locale as AppLocale,
    path: "/news",
    title: "Master Premier News and Clean Energy Updates",
    description:
      "Stay updated on Master Premier Green Energy projects, renewable energy insights, and clean energy access developments in South Sudan.",
    keywords: queryKeyword ? [...sanityKeywords, queryKeyword] : sanityKeywords,
  });
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;

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
  const breadcrumbSchema = buildBreadcrumbSchema({
    locale: locale as AppLocale,
    items: [
      { name: "Home", path: "/" },
      { name: "News", path: "/news" },
    ],
  });

  const newsCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Master Premier News and Clean Energy Updates",
    url: `${SITE_URL}/${locale}/news`,
    inLanguage: locale,
    hasPart: posts.slice(0, 20).map((post, index) => ({
      "@type": "BlogPosting",
      position: index + 1,
      headline: post.title,
      url: `${SITE_URL}/${locale}/post/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author?.name ?? "Master Premier Editorial Team",
      },
    })),
  };

  return (
    <div className="bg-slate-50 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsCollectionSchema) }}
      />
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

        <NewsGrid posts={nonFeaturedPosts} categories={categories} initialSearch={q?.trim() ?? ""} />

        <section className="mt-16">
          <Newsletter />
        </section>
      </div>
    </div>
  );
}
