"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "@/i18n/I18nProvider";
import type { AppLocale } from "@/i18n/config";

export default function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const t = useTranslations;
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale: AppLocale) => {
    const segments = (pathname ?? "/").split("/").filter(Boolean);
    const rest = segments.slice(1).join("/");
    const nextPath = rest ? `/${nextLocale}/${rest}` : `/${nextLocale}`;
    router.replace(nextPath);
  };

  const wrapperClass = mobile
    ? "mb-2 flex items-center justify-end gap-2"
    : "flex items-center rounded-full border border-slate-200 bg-white p-1";

  return (
    <div className={wrapperClass}>
      {([
        { code: "en", label: t("nav.english") },
        { code: "am", label: t("nav.amharic") },
      ] as const).map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => switchLocale(lang.code)}
          className={clsx(
            "rounded-full px-3 py-1 text-xs font-semibold",
            mobile && "border",
            locale === lang.code
              ? mobile
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "bg-emerald-600 text-white"
              : mobile
                ? "border-slate-200 text-slate-700"
                : "text-slate-700"
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
