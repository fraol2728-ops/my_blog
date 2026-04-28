export const locales = ["en", "ar"] as const;

export type AppLocale = "en" | "ar";

export const defaultLocale: AppLocale = "en";

export const isValidLocale = (value: string): value is AppLocale => value === "en" || value === "ar";
