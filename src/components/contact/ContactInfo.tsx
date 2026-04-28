"use client";

import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";

const contactItems = [
  { icon: MapPin, label: "Address", value: "Thongping, Florian Road, Block 3, Plot No. 258 - Juba, South Sudan" },
  { icon: Phone, label: "Phone 1", value: "+211 982 004 848" },
  { icon: Phone, label: "Phone 2", value: "+211 928 004 848" },
  { icon: Mail, label: "Email", value: "mpgenergy@gmail.com" },
  { icon: Clock3, label: "Working Hours", value: "Mon - Fri: 8:00 AM - 6:00 PM" },
];

export default function ContactInfo() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <aside className={`rounded-2xl border border-green-100 bg-green-50/60 p-6 sm:p-8 ${lang === "ar" ? "text-right" : "text-left"}`}>
      <h2 className="text-2xl font-semibold text-gray-900">{t.contact.infoTitle}</h2>
      <p className="mt-2 text-sm text-gray-600">{t.contact.subheading}</p>

      <div className="mt-6 space-y-5">
        {contactItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-start gap-3">
              <div className="rounded-lg bg-white p-2 text-[#458137] shadow-sm">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{item.label}</p>
                <p className="mt-1 text-sm text-gray-800">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
