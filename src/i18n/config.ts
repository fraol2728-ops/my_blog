export const locales = ["en"] as const;

export type AppLocale = "en" | "am";

export const defaultLocale: AppLocale = "en";

export const isValidLocale = (value: string): value is AppLocale => value === "en";
