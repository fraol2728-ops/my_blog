"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLocale } from "@/i18n/I18nProvider";

const legalDocuments = [
  { title: "Certificate Record 1", image: "/cr1.png" },
  { title: "Certificate Record 2", image: "/cr2.png" },
  { title: "Certificate Record 3", image: "/cr3.jfif" },
  { title: "Legal Document 1", image: "/legal1.jpg" },
  { title: "Legal Document 2", image: "/legal2.jpg" },
];

export default function LegalDocumentsSection() {
  const isAmharic = useLocale() === "am";

  return (
    <section id="legal-documents" className="bg-white px-6 py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16a34a]">
            {isAmharic ? "ሕጋዊ ሰነዶች" : "Legal Documents"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {isAmharic
              ? "የኩባንያችን ኦፊሴላዊ ሕጋዊ ሰነዶች"
              : "Our Official Company Legal Documents"}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-600 sm:text-base">
            {isAmharic
              ? "ለግልጽነት እና ለእምነት የቀረቡ የምዝገባ እና የሕጋዊ ሰነዶች ምስሎች።"
              : "A quick view of registration and legal records that support our compliance and transparency."}
          </p>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {legalDocuments.map((doc) => (
            <motion.article
              key={doc.title}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative h-64 w-full bg-slate-100 sm:h-72">
                <Image
                  src={doc.image}
                  alt={doc.title}
                  fill
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="border-t border-slate-100 px-4 py-3">
                <h3 className="text-sm font-medium text-slate-700 sm:text-base">{doc.title}</h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
