import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Solar Services in South Sudan | Installation & Off-Grid Solutions",
  description:
    "Explore our solar installation, off-grid power systems, and maintenance services for homes and businesses across South Sudan.",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold">Solar Services in South Sudan</h1>
      <div className="mt-8 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold">Solar Installation</h2>
          <p className="mt-3 text-gray-700">
            We provide end-to-end solar installation in South Sudan, including system design, equipment selection, and commissioning for homes,
            offices, and commercial compounds in Juba and beyond.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Off-grid Systems</h2>
          <p className="mt-3 text-gray-700">
            Our off-grid systems combine quality solar panels, battery storage, and smart inverters to ensure dependable power where grid access
            is limited or unstable across South Sudan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Maintenance</h2>
          <p className="mt-3 text-gray-700">
            Routine solar maintenance services include cleaning, diagnostics, performance optimization, and repair support to keep your renewable
            energy system efficient year-round.
          </p>
        </section>
      </div>
      <Image
        src="/service1.jpg"
        alt="Solar services in South Sudan including installation off-grid systems and maintenance"
        width={1200}
        height={700}
        className="mt-10 h-auto w-full rounded-xl object-cover"
      />
    </main>
  );
}
