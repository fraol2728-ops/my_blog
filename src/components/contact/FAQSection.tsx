"use client";

import { useLanguage } from "@/context/language";
import { getTranslation } from "@/lib/translations";

const faqs = [
  {
    question: "How long does solar installation take?",
    answer:
      "Most residential projects are completed within 1-3 days after permits and utility approvals are finalized.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes. We provide flexible financing plans with competitive rates so you can go solar with minimal upfront cost.",
  },
  {
    question: "Will solar panels work on cloudy days?",
    answer:
      "Absolutely. Panels still generate electricity in cloudy weather, though output may be lower than on bright sunny days.",
  },
  {
    question: "What maintenance is required?",
    answer:
      "Solar systems require very little maintenance. We recommend occasional cleaning and an annual inspection for peak performance.",
  },
];

export default function FAQSection() {
  const { lang } = useLanguage();
  const t = getTranslation(lang);
  const isArabic = lang === "ar";
  const localizedFaqs = isArabic
    ? [
        {
          question: "كم يستغرق تركيب نظام الطاقة الشمسية؟",
          answer: "تُستكمل معظم المشاريع السكنية خلال 1 إلى 3 أيام بعد الانتهاء من التصاريح وموافقات شركة الكهرباء.",
        },
        {
          question: "هل توفرون خيارات تمويل؟",
          answer: "نعم. نوفر خطط تمويل مرنة بأسعار تنافسية لمساعدتك على التحول إلى الطاقة الشمسية بأقل تكلفة مبدئية.",
        },
        {
          question: "هل تعمل الألواح الشمسية في الأيام الغائمة؟",
          answer: "بالتأكيد. ما زالت الألواح تولد الكهرباء في الطقس الغائم، لكن الإنتاج قد يكون أقل مقارنة بالأيام المشمسة.",
        },
        {
          question: "ما نوع الصيانة المطلوبة؟",
          answer: "تحتاج أنظمة الطاقة الشمسية إلى صيانة قليلة جدًا. نوصي بالتنظيف الدوري وإجراء فحص سنوي للحفاظ على أفضل أداء.",
        },
      ]
    : faqs;
  return (
    <section id="faqs" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {t.contact.faqTitle}
          </h2>
          <p className="mt-3 text-gray-600">
            {t.contact.faqSubtitle}
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {localizedFaqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-gray-200 bg-white p-5">
              <summary className={`cursor-pointer list-none pr-8 text-base font-semibold text-gray-900 marker:content-none ${lang === "ar" ? "text-right" : "text-left"}`}>
                {faq.question}
                <span className="float-right text-[#458137] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
