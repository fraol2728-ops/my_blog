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
    title: "Cybersecurity Insights and Threat Intelligence Blog",
    description:
      "Read expert analysis from Xyberosec on cyber threats, SOC operations, compliance strategy, and practical guidance for building resilient security programs.",
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
