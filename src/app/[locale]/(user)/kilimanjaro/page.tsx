import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";

const coreValues = [
  {
    title: "Integrity",
    description: "Honesty and professionalism in every customer engagement.",
  },
  {
    title: "Teamwork",
    description: "Strong internal coordination and customer partnerships.",
  },
  {
    title: "Reliability",
    description: "Always available and ready to support clients.",
  },
  {
    title: "Responsiveness",
    description: "Focused on quality, efficiency, and timeliness.",
  },
];

const services = [
  "General Construction: Commercial and residential buildings, roads, bridges, railways, airports, and dams.",
  "Civil Works: Borehole drilling, electrical installations, and architectural designs.",
  "Renovations: Upgrading broken, damaged, or outdated structures.",
  "Maintenance: Cleaning, fumigation, and painting for offices, apartments, and hotels.",
  "Real Estate & Property Management: Renting, leasing, sales, and legal contracts.",
];


export default function KilimanjaroPage() {
  return (
    <div className="bg-slate-950 text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 px-6 py-24 sm:px-10">
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-teal-500/20 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-emerald-300/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Official Name
            </p>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
              Kilimanjaro Construction Consulting and Design Co. Ltd.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              A construction and general trading company focused on large-scale delivery, dependable quality,
              and long-term partnerships across East Africa.
            </p>
          </div>

          <div className="ui-card overflow-hidden border border-white/15 bg-white/5">
            <Image
              src="/kilimanjaro.png"
              alt="Kilimanjaro Construction Consulting and Design Co. Ltd logo"
              width={640}
              height={420}
              className="h-full w-full object-contain bg-white/90 p-5"
            />
          </div>
        </div>
      </section>

      <Section className="bg-slate-950 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="ui-card space-y-3 p-6">
            <h2 className="text-xl font-semibold text-emerald-700">Location</h2>
            <p className="text-slate-700">Office: Thongping, Florian Rd Block 3, Plot No 258, Juba, South Sudan.</p>
          </div>

          <div className="ui-card space-y-3 p-6">
            <h2 className="text-xl font-semibold text-emerald-700">Contact Details</h2>
            <ul className="space-y-2 text-slate-700">
              <li>Phone: +211 928004848 / +211 982004848 / +46762812004</li>
              <li>Email: kilimanjaro.construction1@gmail.com</li>
              <li>Managing Director Email: nalyno.gt@gmail.com</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-900 py-14">
        <div className="mx-auto max-w-6xl space-y-8 [&_.ui-kicker]:text-emerald-300 [&_.ui-subtitle]:text-slate-300 [&_.ui-title]:text-white">
          <SectionHeader
            kicker="Corporate Identity"
            title="Mission, Vision, and Core Values"
            subtitle="The company operates with clear priorities centered on quality and trust."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <article className="ui-card space-y-4 border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-semibold text-white">Mission</h3>
              <p className="text-slate-200">
                To be recognized as the leading construction and general trading company in East Africa,
                with quality as the top priority.
              </p>
            </article>

            <article className="ui-card space-y-4 border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-semibold text-white">Vision</h3>
              <p className="text-slate-200">
                To create long-lasting relationships by continuously exceeding customer expectations.
              </p>
            </article>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((item) => (
              <article key={item.title} className="rounded-2xl border border-emerald-200/20 bg-emerald-500/10 p-5">
                <h4 className="text-lg font-semibold text-emerald-200">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-200">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-slate-950 py-14">
        <div className="mx-auto max-w-6xl space-y-6 [&_.ui-kicker]:text-emerald-300 [&_.ui-subtitle]:text-slate-300 [&_.ui-title]:text-white">
          <SectionHeader
            kicker="Our Services"
            title="Construction and Engineering Expertise"
            subtitle="Kilimanjaro customizes delivery based on the project size and scope."
          />

          <ul className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <li key={service} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-100">
                {service}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-slate-900 py-14">
        <div className="mx-auto max-w-6xl space-y-8 [&_.ui-kicker]:text-emerald-300 [&_.ui-subtitle]:text-slate-300 [&_.ui-title]:text-white">
          <SectionHeader
            kicker="Leadership & Team"
            title="Experienced Leadership and Skilled Professionals"
            subtitle="A management-driven and technically strong team enables consistent project execution."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <article className="ui-card border border-white/10 bg-white/5 p-6 text-slate-200">
              <h3 className="text-xl font-semibold text-emerald-300">Chairman</h3>
              <p className="mt-3">
                Goitom Yohannes Tecle, with more than 26 years of management experience across Sweden,
                the Middle East, Eritrea, Ethiopia, and South Sudan.
              </p>
            </article>

            <article className="ui-card border border-white/10 bg-white/5 p-6 text-slate-200">
              <h3 className="text-xl font-semibold text-emerald-300">Team</h3>
              <p className="mt-3">
                Highly experienced engineers, project management experts, and skilled workers. Most key staff
                hold master&apos;s degrees and have over 20 years of practical experience.
              </p>
            </article>
          </div>
        </div>
      </Section>

    </div>
  );
}
