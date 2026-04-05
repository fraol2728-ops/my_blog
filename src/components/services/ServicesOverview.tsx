import { Factory, PackageCheck, ShieldCheck, SunMedium } from "lucide-react";

const overviewItems = [
  { title: "Solar Installation", icon: SunMedium },
  { title: "Equipment Supply", icon: PackageCheck },
  { title: "Manufacturing", icon: Factory },
  { title: "Maintenance", icon: ShieldCheck },
];

export default function ServicesOverview() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid divide-y divide-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
            {overviewItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-center gap-4 px-6 py-10"
              >
                <item.icon className="h-6 w-6 text-[#f2922a]" aria-hidden="true" />
                <h2 className="text-base font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
