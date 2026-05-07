import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQSection from "@/components/contact/FAQSection";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { buildBreadcrumbSchema } from "@/lib/seo";
import type { Metadata } from "next";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  return {
    title: "Contact Master Premier Green Energy | Solar Quote South Sudan",
    description:
      "Contact Master Premier Green Energy Co. Ltd for a free solar energy quote in South Sudan. Call +211 982 004 848 or email mpgenergy@gmail.com. Based in Juba.",
    keywords:
      "Master Green Energy, Master Premier Green Energy, Master Green, MPGE, Master Green Energy Solar, solar energy South Sudan, solar company South Sudan, solar installation Juba, off-grid solar South Sudan, renewable energy South Sudan",
    alternates: {
      canonical: "https://www.masterpremier.energy/en/contact",
    },
    openGraph: {
      title: "Contact Master Premier Green Energy | Solar Quote South Sudan",
      description:
        "Contact Master Premier Green Energy Co. Ltd for a free solar energy quote in South Sudan. Call +211 982 004 848 or email mpgenergy@gmail.com. Based in Juba.",
      url: "https://www.masterpremier.energy/en/contact",
      siteName: "Master Premier Green Energy Co. Ltd",
      type: "website",
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const breadcrumbSchema = buildBreadcrumbSchema({
    locale: locale as AppLocale,
    items: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
            <ContactHero />
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps?q=Thongping,+Florian+Road,+Block+3,+Plot+No.+258,+Juba,+South+Sudan&output=embed"
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
