import type { TypedObject } from "sanity";
import type { Language } from "@/context/language";

export type LocalizedValue<T> = {
  en?: T;
  ar?: T;
};

export type LocalizedPortableText = LocalizedValue<TypedObject[]>;

export const isLocalizedValue = <T>(value: unknown): value is LocalizedValue<T> =>
  typeof value === "object" && value !== null && ("en" in value || "ar" in value);

export const getLocalizedValue = <T>(
  value: T | LocalizedValue<T> | null | undefined,
  lang: Language,
  fallback: T,
): T => {
  if (isLocalizedValue<T>(value)) {
    return value[lang] ?? value.en ?? fallback;
  }

  return (value as T) ?? fallback;
};
