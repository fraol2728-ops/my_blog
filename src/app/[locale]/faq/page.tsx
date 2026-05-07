import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "What is Master Premier Green Energy?",
    answer:
      "Master Premier Green Energy Co. Ltd (MPGE) is South Sudan's leading renewable energy company, based in Juba. We specialize in solar panel installation, off-grid solar systems, energy audits, feasibility studies, and clean energy advisory services across South Sudan.",
  },
  {
    question: "Where is Master Premier Green Energy located?",
    answer:
      "We are located at Thongping, Florian Road, Block 3, Plot No. 258, Juba, South Sudan. We serve clients across all regions of South Sudan including Juba, Kuajok, and Wau.",
  },
  {
    question: "What solar services does Master Premier Green Energy offer?",
    answer:
      "We offer complete solar energy services including: solar system installation for homes, businesses and industries; solar equipment supply; local solar panel manufacturing; energy audits; feasibility studies; system design; and long-term maintenance and technical support.",
  },
  {
    question: "How much does solar installation cost in South Sudan?",
    answer:
      "The cost depends on your energy needs and system size. Master Premier Green Energy provides free consultations and detailed commercial proposals tailored to your specific requirements. Contact us at +211 982 004 848 for a free quote.",
  },
  {
    question: "What is an off-grid solar system?",
    answer:
      "An off-grid solar system operates independently from the national electricity grid. It uses solar panels and battery storage to provide reliable power 24/7, making it ideal for South Sudan where grid access is limited. Our Kuajok City project powers 125,585 residents using this technology.",
  },
  {
    question: "Does Master Premier Green Energy manufacture solar panels locally?",
    answer:
      "Yes. We have local solar panel manufacturing capabilities in South Sudan, producing quality-controlled solar modules that reduce logistics time and support regional clean energy growth.",
  },
  {
    question: "What is the biggest solar project Master Premier Green Energy has done?",
    answer:
      "Our flagship project is the Kuajok City off-grid Solar PV Power Project — a 4.24 MWp system using 7,000 high-efficiency solar modules and battery storage providing 24/7 electricity to 125,585 residents.",
  },
  {
    question: "How do I get started with solar energy for my home or business?",
    answer:
      "Contact Master Premier Green Energy for a free consultation. Our team will conduct an energy audit, assess your site, design a tailored system, and provide a commercial proposal with full cost breakdown. Call +211 982 004 848 or email mpgenergy@gmail.com.",
  },
  {
    question: "Is solar energy reliable in South Sudan?",
    answer:
      "Yes. South Sudan receives excellent solar irradiation year-round, making it one of the best environments for solar energy in Africa. Our systems are designed and installed to withstand local conditions and deliver reliable power for 20+ years.",
  },
  {
    question: "How long does solar installation take?",
    answer:
      "Small residential systems typically take 1–3 days. Commercial and industrial systems take 1–4 weeks depending on size and complexity. Master Premier Green Energy handles everything from site survey to final commissioning.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  return {
    title: "Solar Energy FAQ South Sudan | Master Premier Green Energy",
    description:
      "Frequently asked questions about solar energy in South Sudan. Master Premier Green Energy answers the most common questions about solar installation, costs, off-grid systems and more.",
    alternates: {
      canonical: "https://www.masterpremier.energy/en/faq",
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  return (
    <main className="bg-white py-20 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Frequently Asked Questions — Solar Energy in South Sudan
        </h1>

        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-slate-900 marker:content-none">
                {item.question}
              </summary>
              <p className="mt-4 leading-7 text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
