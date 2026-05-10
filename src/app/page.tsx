import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Solar Power Solutions in South Sudan | Master Premier Green Energy",
  description:
    "Affordable solar power systems, installation, and renewable energy services in South Sudan. Power your home or business with clean energy.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Master Premier Green Energy",
  description:
    "Affordable solar installation, off-grid systems, and renewable energy solutions for homes and businesses in South Sudan.",
  url: "https://www.masterpremier.energy",
  areaServed: "South Sudan",
  serviceType: "Solar Installation",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Solar Power Solutions in South Sudan</h1>
          <p className="mt-4 text-lg text-gray-700">
            Master Premier Green Energy delivers reliable solar installation services for residential and commercial clients across South Sudan,
            including fast-growing neighborhoods in Juba.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Our team designs and deploys high-performance off-grid systems that reduce diesel dependence and provide stable electricity for homes,
            offices, schools, clinics, and industrial facilities.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            From site assessment to commissioning, we build renewable energy solutions tailored to South Sudan&apos;s climate, power needs, and
            long-term operating costs.
          </p>
        </div>
        <Image
          src="/hero.jpg"
          alt="Solar power installation and off-grid solar systems in Juba South Sudan"
          width={1200}
          height={800}
          className="h-auto w-full rounded-xl object-cover"
          priority
        />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </main>
  );
}
