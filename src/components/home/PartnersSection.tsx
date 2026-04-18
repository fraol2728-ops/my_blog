import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";

const partners = [
  {
    name: "Kumneger",
    logo: "/kumneger.png",
    href: "https://kumneger.kehaliyans.com/",
    description: "Visit Kumneger",
    external: true,
  },
  {
    name: "KILIMANJARO CONSTRUCTION CONSULTING AND DESIGN CO. LTD",
    logo: "/kilimanjaro.png",
    href: "/kilimanjaro",
    description: "Explore Kilimanjaro Construction",
    external: false,
  },
] as const;

export default function PartnersSection({ locale }: { locale: string }) {
  return (
    <Section className="pb-10 pt-14 sm:pt-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionHeader
          align="center"
          kicker="Trusted Partners"
          title="Our Partner Brands"
          subtitle="We collaborate with reliable partners and construction leaders to deliver stronger projects across the region."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {partners.map((partner) => {
            const href = partner.external ? partner.href : `/${locale}${partner.href}`;

            return (
              <Link
                key={partner.name}
                href={href}
                target={partner.external ? "_blank" : undefined}
                rel={partner.external ? "noreferrer noopener" : undefined}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100"
              >
                <span className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl transition-all duration-500 group-hover:scale-125" />

                <div className="relative flex min-h-[240px] flex-col justify-between gap-6">
                  <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain p-2 transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold uppercase leading-relaxed tracking-wide text-slate-900 sm:text-lg">
                      {partner.name}
                    </h3>
                    <p className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 transition group-hover:bg-emerald-100">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
