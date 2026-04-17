"use client";

import { useLocale } from "@/i18n/I18nProvider";

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
  const isAmharic = useLocale() === ("am" as string);
  const localizedFaqs = isAmharic
    ? [
        {
          question: "የፀሐይ ስርዓት ተከላ ምን ያህል ጊዜ ይወስዳል?",
          answer: "አብዛኛዎቹ የመኖሪያ ፕሮጀክቶች ፈቃድና የዩቲሊቲ ፍቃዶች ከተጠናቀቁ በኋላ በ1-3 ቀናት ውስጥ ይጠናቀቃሉ።",
        },
        {
          question: "የፋይናንስ አማራጮች አሉ?",
          answer: "አዎ። በተወዳዳሪ ዋጋ ተለዋዋጭ የፋይናንስ እቅዶችን እናቀርባለን።",
        },
        {
          question: "ፀሐይ ፓነሎች ደመናማ ቀን ላይ ይሰራሉ?",
          answer: "በፍጹም። በደመና ጊዜም ኤሌክትሪክ ያመነጫሉ፣ ነገር ግን አፈጻጸሙ በፀሐይ ብርሃን ቀን ከሚኖረው ያነሰ ሊሆን ይችላል።",
        },
        {
          question: "ምን ዓይነት ጥገና ያስፈልጋል?",
          answer: "የፀሐይ ስርዓቶች እጅግ ትንሽ ጥገና ይፈልጋሉ። አልፎ አልፎ ማጽዳት እና ዓመታዊ ምርመራ እንመክራለን።",
        },
      ]
    : faqs;
  return (
    <section id="faqs" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {isAmharic ? "ተደጋጋሚ ጥያቄዎች" : "Frequently Asked Questions"}
          </h2>
          <p className="mt-3 text-gray-600">
            {isAmharic ? "በፀሐይ ኃይል ውሳኔዎ ላይ እርግጠኛ እንዲሆኑ ፈጣን መልሶች።" : "Quick answers to help you make a confident solar decision."}
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {localizedFaqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-gray-200 bg-white p-5">
              <summary className="cursor-pointer list-none pr-8 text-left text-base font-semibold text-gray-900 marker:content-none">
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
