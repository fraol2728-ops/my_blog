"use client";

import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { useLocale } from "@/i18n/I18nProvider";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Solar System Installation",
    description:
      "From site survey to final commissioning, we design and install high-performance solar systems tailored to your property and energy goals.",
    highlights: [
      "Detailed site evaluation and system sizing",
      "Professional rooftop and ground-mount installation",
      "Grid integration and commissioning support",
    ],
    image: "/service1.jpg",
    alt: "Technicians installing solar panels on a rooftop",
  },
  {
    title: "Solar Equipment & Product Supply",
    description:
      "We supply premium solar panels, inverters, batteries, and accessories to ensure every project is built for efficiency, durability, and long-term value.",
    highlights: [
      "Tier-1 panels and trusted inverter brands",
      "Battery storage and backup power components",
      "Fast, reliable procurement and delivery",
    ],
    image: "/service2.jpg",
    alt: "Solar equipment and hardware prepared for installation",
  },
  {
    title: "Local Solar Panel Manufacturing",
    description:
      "Our local manufacturing capabilities help deliver quality-controlled solar modules while reducing lead times and supporting regional clean energy growth.",
    highlights: [
      "Locally produced modules with strict QA",
      "Scalable output for residential and commercial demand",
      "Reduced logistics time and project delays",
    ],
    image: "/service3.jpg",
    alt: "Solar panel manufacturing line with assembled modules",
  },
  {
    title: "Maintenance & Technical Support",
    description:
      "Keep your solar investment performing at its best with preventive maintenance, diagnostics, and responsive technical support from certified specialists.",
    highlights: [
      "Routine inspections and performance checks",
      "Rapid troubleshooting and repair services",
      "Long-term monitoring and optimization",
    ],
    image: "/service4.png",
    alt: "Engineer providing technical support for a solar system",
  },
];

export default function ServicesSection() {
  const isAmharic = useLocale() === "am";
  const localizedServices = isAmharic
    ? services.map((service) => ({
        ...service,
        title:
          {
            "Solar System Installation": "የፀሐይ ኃይል ስርዓት ተከላ",
            "Solar Equipment & Product Supply": "የፀሐይ መሳሪያና ምርት አቅርቦት",
            "Local Solar Panel Manufacturing": "የአካባቢ የፀሐይ ፓነል ማምረት",
            "Maintenance & Technical Support": "ጥገና እና ቴክኒካል ድጋፍ",
          }[service.title] ?? service.title,
        description:
          {
            "From site survey to final commissioning, we design and install high-performance solar systems tailored to your property and energy goals.":
              "ከቦታ ጥናት እስከ መጨረሻ ኮሚሽን ድረስ ለእርስዎ ንብረትና የኃይል ፍላጎት የሚስማማ ከፍተኛ ብቃት ያለው የፀሐይ ስርዓት እንዘጋጃለን እና እንጫናለን።",
            "We supply premium solar panels, inverters, batteries, and accessories to ensure every project is built for efficiency, durability, and long-term value.":
              "እያንዳንዱ ፕሮጀክት በውጤታማነት፣ በጽናት እና በረጅም ጊዜ ዋጋ እንዲገነባ ጥራት ያላቸው ፓነሎች፣ ኢንቨርተሮች፣ ባትሪዎች እና ተጨማሪ እቃዎችን እናቀርባለን።",
            "Our local manufacturing capabilities help deliver quality-controlled solar modules while reducing lead times and supporting regional clean energy growth.":
              "የአካባቢ ማምረቻ ብቃታችን ጥራት የተቆጣጠረ የፀሐይ ሞጁል እንድናቀርብ ያግዛል፤ እንዲሁም የአቅርቦት ጊዜን ያሳንሳል እና የክልሉን ንጹህ ኃይል እድገት ይደግፋል።",
            "Keep your solar investment performing at its best with preventive maintenance, diagnostics, and responsive technical support from certified specialists.":
              "የፀሐይ ኢንቨስትመንትዎ በከፍተኛ አፈጻጸም እንዲቆይ በቅድመ ጥገና፣ በምርመራ እና ፈጣን ቴክኒካል ድጋፍ ከተረጋገጡ ባለሙያዎች ጋር እንረዳዎታለን።",
          }[service.description] ?? service.description,
        highlights: service.highlights.map(
          (highlight) =>
            ({
              "Detailed site evaluation and system sizing": "ዝርዝር የቦታ ግምገማ እና የስርዓት መጠን ማስተካከያ",
              "Professional rooftop and ground-mount installation": "በባለሙያ የጣሪያ እና የመሬት ላይ ተከላ",
              "Grid integration and commissioning support": "የግሪድ ግንኙነት እና የኮሚሽን ድጋፍ",
              "Tier-1 panels and trusted inverter brands": "Tier-1 ፓነሎች እና ታማኝ የኢንቨርተር ብራንዶች",
              "Battery storage and backup power components": "የባትሪ ማከማቻ እና የተተኪ ኃይል ክፍሎች",
              "Fast, reliable procurement and delivery": "ፈጣን እና ታማኝ ግዥ እና አቅርቦት",
              "Locally produced modules with strict QA": "በጥብቅ የጥራት ቁጥጥር የተመረቱ የአካባቢ ሞጁሎች",
              "Scalable output for residential and commercial demand": "ለመኖሪያ እና ለንግድ ፍላጎት የሚለዋወጥ ምርት",
              "Reduced logistics time and project delays": "የሎጂስቲክስ ጊዜን እና የፕሮጀክት መዘግየትን መቀነስ",
              "Routine inspections and performance checks": "መደበኛ ምርመራ እና የአፈጻጸም ቁጥጥር",
              "Rapid troubleshooting and repair services": "ፈጣን መላ ፍለጋ እና የጥገና አገልግሎት",
              "Long-term monitoring and optimization": "የረጅም ጊዜ ክትትል እና ማሻሻያ",
            }[highlight] ?? highlight),
        ),
      }))
    : services;

  return (
    <Section className="max-w-6xl">
      <Reveal>
        <SectionHeader
          align="center"
          kicker={isAmharic ? "አገልግሎቶቻችን" : "Our Services"}
          title={isAmharic ? "ለሁሉም ፍላጎት ሁሉን አቀፍ የፀሐይ ኃይል መፍትሄዎች" : "Comprehensive Solar Solutions for Every Need"}
          subtitle={
            isAmharic
              ? "ከተከላ እስከ ማምረት እና ረጅም ጊዜ ድጋፍ ድረስ ሙሉ የፀሐይ ኃይል መፍትሄዎችን እንሰጣለን።"
              : "We provide complete solar energy solutions, from installation to manufacturing and long-term support."
          }
        />
      </Reveal>

      <div className="mt-16 space-y-12">
        {localizedServices.map((service, index) => {
          const imageFirst = index % 2 === 0;

          return (
            <Reveal
              key={service.title}
              delay={index * 0.08}
              className="ui-card ui-card-hover grid items-center gap-8 p-6 md:grid-cols-2 md:p-8"
            >
              <div className={imageFirst ? "order-1" : "order-2 md:order-2"}>
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={1200}
                    height={800}
                    className="h-[400px] w-full object-cover transition duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className={imageFirst ? "order-2" : "order-1 md:order-1"}>
                <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">{service.title}</h3>
                <p className="mt-4 text-base text-slate-600 md:text-lg">{service.description}</p>

                <ul className="mt-6 space-y-3">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span className="text-base text-slate-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
