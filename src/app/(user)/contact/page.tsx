import { Button } from "@/components/button";
import Container from "@/components/container";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pb-24">
      <Container className="mt-16">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-gray-950 sm:text-6xl">
          Let&apos;s plan your solar project.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
          Tell us about your goals and our team will reach out with practical,
          transparent recommendations.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <form className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-medium text-gray-950">Request a consultation</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">First name</label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last name</label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                placeholder="jane@example.com"
              />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                placeholder="(555) 000-0000"
              />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Project details</label>
              <textarea
                rows={5}
                className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                placeholder="Tell us about your location, roof type, and goals..."
              />
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full bg-emerald-700 data-[hover]:bg-emerald-600 sm:w-auto">
                Send message
              </Button>
            </div>
          </form>

          <aside className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 sm:p-8">
            <h2 className="text-2xl font-medium text-gray-950">Company info</h2>
            <div className="mt-6 space-y-4 text-sm text-gray-700">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 text-emerald-700" />
                2400 Green Valley Ave, San Diego, CA 92108
              </p>
              <p className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 text-emerald-700" />
                +1 (619) 555-0199
              </p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 text-emerald-700" />
                hello@solarpeak.com
              </p>
              <p className="flex items-start gap-2">
                <Clock3 className="mt-0.5 size-4 text-emerald-700" />
                Mon - Fri: 8:00 AM - 6:00 PM
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
