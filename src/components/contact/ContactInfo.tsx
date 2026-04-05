import { Clock3, Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    label: "Address",
    value: "2400 Green Valley Ave, San Diego, CA 92108",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (619) 555-0199",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@solarpeak.com",
  },
  {
    icon: Clock3,
    label: "Working Hours",
    value: "Mon - Fri: 8:00 AM - 6:00 PM",
  },
];

export default function ContactInfo() {
  return (
    <aside className="rounded-2xl border border-green-100 bg-green-50/60 p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
      <p className="mt-2 text-sm text-gray-600">
        Reach out directly or send your request through the form.
      </p>

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
