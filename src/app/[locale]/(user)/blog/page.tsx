import { isValidLocale, type AppLocale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  return pageMetadata({
    locale: locale as AppLocale,
    path: "/blog",
    title: "Renewable Energy Insights and Project Stories",
    description:
      "Read updates from Master Premier Green Energy on solar deployment, energy access, and clean energy best practices.",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  redirect(`/${locale}/news`);
}
