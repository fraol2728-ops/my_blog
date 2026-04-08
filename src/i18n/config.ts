export const locales = ["en", "am"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

export const isValidLocale = (value: string): value is AppLocale =>
  locales.includes(value as AppLocale);
