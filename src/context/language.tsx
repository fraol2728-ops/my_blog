"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "ar";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const LANGUAGE_STORAGE_KEY = "site-language";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "en" || saved === "ar") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    document.body.classList.toggle("font-arabic", lang === "ar");
    document.body.classList.toggle("font-sans", lang !== "ar");
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
