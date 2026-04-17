import type { AppLocale } from "./config";

import en from "../../messages/en.json";
import ar from "../../messages/ar.json";

const catalogs = { en, ar } as const;

export type Messages = typeof en;

export function getMessages(locale: AppLocale): Messages {
  return catalogs[locale];
}

export function resolveMessage(messages: Messages, key: string): string {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (typeof acc === "object" && acc !== null && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }

    return undefined;
  }, messages) as string;
}
