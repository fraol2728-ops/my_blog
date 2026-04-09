import AboutSection from "@/components/home/AboutSection";
import BlogPreview from "@/components/home/BlogPreview";
import HeroSection from "@/components/home/HeroSection";
import ProcessSection from "@/components/home/ProcessSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhySolarSection from "@/components/home/WhySolarSection";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { getLocalizedHomeMeta, pageMetadata } from "@/lib/seo";
import { getAllPosts, getFeaturedPosts } from "@/sanity/queries";
import type { Post } from "@/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const localized = getLocalizedHomeMeta(locale as AppLocale);

  return pageMetadata({
    locale: locale as AppLocale,
    path: "/",
    title: localized.title,
    description: localized.description,
    keywords: [
      "renewable energy company South Sudan",
      "solar engineering services Juba",
      "clean energy technical support",
      "sustainable power solutions",
    ],
  });
}

export default async function Home() {
  let latestPosts: Post[] = [];
  let featuredPosts: Post[] = [];

  try {
    [latestPosts, featuredPosts] = await Promise.all([getAllPosts(3), getFeaturedPosts(1)]);
  } catch {
    latestPosts = [];
    featuredPosts = [];
  }

  const latestPost = featuredPosts?.[0] ?? latestPosts?.[0] ?? null;

  return (
    <div className="bg-white text-slate-900">
      <HeroSection latestPost={latestPost} />

      <main>
        <AboutSection />
        <BlogPreview posts={latestPosts} />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <WhySolarSection />
      </main>
    </div>
  );
}
