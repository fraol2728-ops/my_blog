"use client";

import { createContext, useContext, useMemo } from "react";
import type { AppLocale } from "./config";
import type { Messages } from "./get-messages";
import { resolveMessage } from "./get-messages";

type I18nContextValue = {
  locale: AppLocale;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: AppLocale;
  messages: Messages;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useLocale must be used within I18nProvider");
  }

  return context.locale;
}

export function useTranslations(key: string) {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useTranslations must be used within I18nProvider");
  }

  const message = resolveMessage(context.messages, key);
  return typeof message === "string" ? message : key;
}
