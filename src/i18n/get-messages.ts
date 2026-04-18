import type { AppLocale } from "./config";

import en from "../../messages/en.json";

const catalogs = { en } as const;

export type Messages = typeof en;

export function getMessages(locale: AppLocale): Messages {
  if (locale === "am") {
    return catalogs.en;
  }

  return catalogs.en;
}

export function resolveMessage(messages: Messages, key: string): string {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (typeof acc === "object" && acc !== null && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }

    return undefined;
  }, messages) as string;
}
