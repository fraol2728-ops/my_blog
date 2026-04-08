export const routing = {
  locales: ["en", "am"],
  defaultLocale: "en",
  localePrefix: "always",
} as const;

export type AppLocale = (typeof routing.locales)[number];

export const isValidLocale = (locale: string): locale is AppLocale =>
  routing.locales.includes(locale as AppLocale);
