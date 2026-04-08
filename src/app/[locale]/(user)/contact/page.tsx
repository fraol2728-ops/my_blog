import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQSection from "@/components/contact/FAQSection";
import { getMessages } from "@/i18n/get-messages";
import { isValidLocale, type AppLocale } from "@/i18n/config";
import { notFound } from "next/navigation";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale as AppLocale);

  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{t.contact.heading}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">{t.contact.subheading}</p>
        </div>
      </section>

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
              title={t.contact.mapTitle}
              src="https://www.google.com/maps?q=San+Diego,+CA&output=embed"
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
