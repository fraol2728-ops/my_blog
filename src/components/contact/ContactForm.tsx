"use client";

import { trackEvent } from "@/lib/analytics/events";
import { useLocale } from "@/i18n/I18nProvider";
import { LeadPayload } from "@/lib/validation/lead";
import { FormEvent, useMemo, useState } from "react";

type FormState = LeadPayload;

type Errors = Partial<Record<keyof LeadPayload, string>>;

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  source: "contact-page",
};

export default function ContactForm() {
  const isAmharic = useLocale() === "am";
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const canSubmit = useMemo(
    () => !isSubmitting && form.fullName && form.email && form.phone && form.service && form.message,
    [form, isSubmitting],
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setErrors({});

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors(data.errors ?? {});
      setIsSubmitting(false);
      return;
    }

    trackEvent({
      event: "lead_submitted",
      payload: {
        service: form.service,
        hasCompany: Boolean(form.company),
      },
    });

    setForm(initialState);
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-900">
        {isAmharic ? "ነፃ ምክክር ይጠይቁ" : "Request Your Free Consultation"}
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        {isAmharic
          ? "ጥቂት መረጃዎችን ያጋሩን፤ ቡድናችንም በአንድ የስራ ቀን ውስጥ ያገኛችሁታል።"
          : "Share a few details and our team will reach out within one business day."}
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">{isAmharic ? "ሙሉ ስም" : "Full Name"}</label>
          <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))} placeholder="John Doe" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30" />
          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">{isAmharic ? "ኢሜይል" : "Email"}</label>
          <input id="email" name="email" type="email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="john@example.com" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">{isAmharic ? "ስልክ" : "Phone"}</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} placeholder="(555) 123-4567" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30" />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="company" className="text-sm font-medium text-gray-700">{isAmharic ? "ኩባንያ (አማራጭ)" : "Company (Optional)"}</label>
            <input id="company" name="company" type="text" value={form.company} onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))} placeholder="Acme Energy" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="service" className="text-sm font-medium text-gray-700">{isAmharic ? "አገልግሎት" : "Service"}</label>
            <select id="service" name="service" value={form.service} onChange={(e) => setForm((prev) => ({ ...prev, service: e.target.value }))} className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30">
              <option value="" disabled>{isAmharic ? "አገልግሎት ይምረጡ" : "Select a service"}</option>
              <option value="installation">{isAmharic ? "የፀሐይ ስርዓት ተከላ" : "Solar Installation"}</option>
              <option value="supply">{isAmharic ? "የመሳሪያ አቅርቦት" : "Equipment Supply"}</option>
              <option value="manufacturing">{isAmharic ? "ማምረት" : "Manufacturing"}</option>
              <option value="maintenance">{isAmharic ? "ጥገና" : "Maintenance"}</option>
            </select>
            {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service}</p>}
          </div>
          <div>
            <label htmlFor="budget" className="text-sm font-medium text-gray-700">{isAmharic ? "በጀት (አማራጭ)" : "Budget (Optional)"}</label>
            <select id="budget" name="budget" value={form.budget} onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))} className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30">
              <option value="">{isAmharic ? "የበጀት ክልል ይምረጡ" : "Select budget range"}</option>
              <option value="under-10k">Under $10k</option>
              <option value="10k-50k">$10k - $50k</option>
              <option value="50k-100k">$50k - $100k</option>
              <option value="100k+">$100k+</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium text-gray-700">{isAmharic ? "መልዕክት" : "Message"}</label>
          <textarea id="message" name="message" rows={5} value={form.message} onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} placeholder="Tell us about your property and energy goals..." className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30" />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
        </div>
      </div>

      <button type="submit" disabled={!canSubmit} className="mt-6 w-full rounded-xl bg-[#458137] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3b6f2f] disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? (isAmharic ? "በመላክ ላይ..." : "Sending...") : isAmharic ? "መልዕክት ላክ" : "Send Message"}
      </button>

      {isSuccess && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {isAmharic
            ? "እናመሰግናለን! ጥያቄዎን ተቀብለናል፤ በአንድ የስራ ቀን ውስጥ እናገኛችሁ።"
            : "Thanks! Your request has been received. We&apos;ll contact you within one business day."}
        </p>
      )}
    </form>
  );
}
