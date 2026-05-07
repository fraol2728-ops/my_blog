"use client";

import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { useLocale } from "@/i18n/I18nProvider";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    slug: "installation",
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
    slug: "equipment",
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
    slug: "manufacturing",
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
    image: "/service4.jpg",
    alt: "Engineer providing technical support for a solar system",
    slug: "maintenance",
  },
];

export default function ServicesSection() {
  const isAmharic = useLocale() === "ar";
  const localizedServices = isAmharic
    ? services.map((service) => ({
        ...service,
        title:
          {
            "Solar System Installation": "تركيب أنظمة الطاقة الشمسية",
            "Solar Equipment & Product Supply": "توريد معدات ومنتجات الطاقة الشمسية",
            "Local Solar Panel Manufacturing": "تصنيع الألواح الشمسية محليًا",
            "Maintenance & Technical Support": "الصيانة والدعم الفني",
          }[service.title] ?? service.title,
        description:
          {
            "From site survey to final commissioning, we design and install high-performance solar systems tailored to your property and energy goals.":
              "من دراسة الموقع إلى التشغيل النهائي، نقوم بتصميم وتركيب أنظمة طاقة شمسية عالية الأداء بما يتناسب مع احتياجاتك وأهدافك من الطاقة.",
            "We supply premium solar panels, inverters, batteries, and accessories to ensure every project is built for efficiency, durability, and long-term value.":
              "نوفّر ألواحًا شمسية عالية الجودة، ومحولات، وبطاريات، وملحقات لضمان تنفيذ كل مشروع بكفاءة عالية ومتانة وقيمة طويلة الأمد.",
            "Our local manufacturing capabilities help deliver quality-controlled solar modules while reducing lead times and supporting regional clean energy growth.":
              "تُمكّننا قدراتنا في التصنيع المحلي من تقديم وحدات شمسية بجودة عالية، مع تقليل زمن التنفيذ ودعم نمو الطاقة النظيفة في المنطقة.",
            "Keep your solar investment performing at its best with preventive maintenance, diagnostics, and responsive technical support from certified specialists.":
              "حافظ على أداء استثمارك في الطاقة الشمسية بأفضل مستوى من خلال الصيانة الوقائية، والتشخيص الدقيق، والدعم الفني السريع من خبراء معتمدين.",
          }[service.description] ?? service.description,
        highlights: service.highlights.map(
          (highlight) =>
            ({
              "Detailed site evaluation and system sizing": "تقييم دقيق للموقع وتحديد حجم النظام",
              "Professional rooftop and ground-mount installation": "تركيب احترافي على الأسطح أو الأرض",
              "Grid integration and commissioning support": "دمج النظام مع الشبكة ودعم التشغيل",
              "Tier-1 panels and trusted inverter brands": "ألواح من الفئة الأولى ومحولات من علامات موثوقة",
              "Battery storage and backup power components": "أنظمة تخزين البطاريات وحلول الطاقة الاحتياطية",
              "Fast, reliable procurement and delivery": "توريد وتسليم سريع وموثوق",
              "Locally produced modules with strict QA": "وحدات مُصنّعة محليًا بمعايير جودة صارمة",
              "Scalable output for residential and commercial demand": "إنتاج قابل للتوسع لتلبية الاحتياجات السكنية والتجارية",
              "Reduced logistics time and project delays": "تقليل وقت اللوجستيات وتأخير المشاريع",
              "Routine inspections and performance checks": "فحوصات دورية ومراقبة الأداء",
              "Rapid troubleshooting and repair services": "خدمات إصلاح وتشخيص سريعة",
              "Long-term monitoring and optimization": "مراقبة وتحسين الأداء على المدى الطويل",
            }[highlight] ?? highlight),
        ),
      }))
    : services;

  return (
    <Section className="max-w-6xl">
      <Reveal>
        <SectionHeader
          align="center"
          kicker={isAmharic ? "خدماتنا" : "Our Services"}
          title={isAmharic ? "حلول متكاملة للطاقة الشمسية لجميع الاحتياجات" : "Comprehensive Solar Solutions for Every Need"}
          subtitle={
            isAmharic
              ? "نقدّم حلول طاقة شمسية متكاملة، بدءًا من التركيب وصولًا إلى التصنيع والدعم طويل الأمد."
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
                    loading="lazy"
            className="h-[400px] w-full object-cover transition duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className={imageFirst ? "order-2" : "order-1 md:order-1"}>
                <Link href={`/en/services#${service.slug}`} className="text-2xl font-semibold text-slate-900 md:text-3xl hover:text-emerald-700">{service.title}</Link>
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
