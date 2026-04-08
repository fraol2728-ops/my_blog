import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { defaultLocale, isValidLocale, type AppLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import { I18nProvider } from "@/i18n/I18nProvider";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale as AppLocale);

  return {
    title: messages.meta.homeTitle,
    description: messages.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        am: "/am",
      },
    },
  };
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
