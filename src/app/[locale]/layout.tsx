import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { defaultLocale, isValidLocale, type AppLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getLocalizedHomeMeta, pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const localized = getLocalizedHomeMeta(locale as AppLocale);

  return pageMetadata({
    locale: locale as AppLocale,
    path: "/",
    title: localized.title,
    description: localized.description,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale ?? defaultLocale);

  return (
    <I18nProvider locale={locale as AppLocale} messages={messages}>
      {children}
    </I18nProvider>
  );
}
