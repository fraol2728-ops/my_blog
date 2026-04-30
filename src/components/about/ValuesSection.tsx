import { BadgeCheck, Handshake, Leaf, ShieldCheck, Zap } from "lucide-react";
import { useLocale } from "@/i18n/I18nProvider";

const values = [
  {
    title: "Stability",
    description:
      "We deliver outstanding and efficient services that strengthen customer trust and long-term loyalty.",
    icon: BadgeCheck,
  },
  {
    title: "Durability",
    description:
      "We focus on quality-tested photovoltaic modules designed for stable performance and strong return on investment.",
    icon: Handshake,
  },
  {
    title: "Reliability",
    description:
      "Our systems are built to withstand demanding environmental conditions and maintain dependable output.",
    icon: Leaf,
  },
  {
    title: "Superior Materials",
    description:
      "We use high-grade components from trusted suppliers to ensure consistent module performance.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation",
    description:
      "We continually expand innovative products and services at affordable prices for South Sudan.",
    icon: Zap,
  },
];

export default function ValuesSection() {
  const isAmharic = useLocale() === "ar";

  const localizedValues = isAmharic
    ? [
        {
          title: "الاستقرار",
          description:
            "نقدم خدمات عالية الجودة وفعالة تعزز ثقة العملاء وولاءهم على المدى الطويل.",
          icon: BadgeCheck,
        },
        {
          title: "المتانة",
          description:
            "نركز على وحدات الطاقة الشمسية عالية الجودة والمختبرة لضمان أداء مستقر وعائد استثماري قوي.",
          icon: Handshake,
        },
        {
          title: "الموثوقية",
          description:
            "أنظمتنا مصممة لتحمل الظروف البيئية القاسية مع الحفاظ على أداء ثابت وموثوق.",
          icon: Leaf,
        },
        {
          title: "مواد عالية الجودة",
          description:
            "نستخدم مكونات عالية الجودة من موردين موثوقين لضمان أداء مستقر ومستمر.",
          icon: ShieldCheck,
        },
        {
          title: "الابتكار",
          description:
            "نعمل باستمرار على تطوير منتجات وخدمات مبتكرة بأسعار مناسبة لجنوب السودان.",
          icon: Zap,
        },
      ]
    : values;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            {isAmharic ? "القيم الأساسية" : "Core Values"}
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {isAmharic
              ? "المبادئ التي تشكل كل مشروع"
              : "Principles That Shape Every Project"}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {localizedValues.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Icon className="size-7 text-[#458137]" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
