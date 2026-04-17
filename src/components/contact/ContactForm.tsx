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

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const sendWithEmailJs = async (payload: FormState) => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error("emailjs_not_configured");
  }

  const formattedMessage = [
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Company: ${payload.company || "-"}`,
    `Service: ${payload.service}`,
    `Budget: ${payload.budget || "-"}`,
    `Source: ${payload.source}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        // Common EmailJS variable names (for broader template compatibility)
        name: payload.fullName,
        from_name: payload.fullName,
        email: payload.email,
        reply_to: payload.email,
        phone: payload.phone,
        company: payload.company || "-",
        service: payload.service,
        budget: payload.budget || "-",
        source: payload.source,
        // Preserve existing keys
        full_name: payload.fullName,
        fullName: payload.fullName,
        message: formattedMessage,
        raw_message: payload.message,
        message_with_details: formattedMessage,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("emailjs_send_failed");
  }
};

export default function ContactForm() {
  const isAmharic = useLocale() === ("am" as string);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const canSubmit = useMemo(
    () => !isSubmitting && form.fullName && form.email && form.phone && form.service && form.message,
    [form, isSubmitting],
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setSubmitError("");
    setErrors({});

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors(data.errors ?? {});
        setSubmitError(
          data.message ??
            (isAmharic ? "ጥያቄዎን መላክ አልተቻለም። እባክዎ እንደገና ይሞክሩ።" : "Unable to send your request. Please try again."),
        );
        setIsSubmitting(false);
        return;
      }

      await sendWithEmailJs(form);

      trackEvent({
        event: "lead_submitted",
        payload: {
          service: form.service,
          hasCompany: Boolean(form.company),
        },
      });

      setForm(initialState);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error && error.message === "emailjs_not_configured") {
        setSubmitError(
          isAmharic
            ? "የኢሜይል አገልግሎት አልተዋቀረም። እባክዎ በኋላ ደግመው ይሞክሩ።"
            : "Email service is not configured yet. Please try again later.",
        );
      } else {
        setSubmitError(
          isAmharic ? "የኔትወርክ ችግር ተፈጥሯል። እባክዎ ደግመው ይሞክሩ።" : "A network error occurred. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
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
          <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))} placeholder={isAmharic ? "ሙሉ ስምዎን ያስገቡ" : "John Doe"} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30" />
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
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} placeholder={isAmharic ? "ስልክ ቁጥርዎን ያስገቡ" : "(555) 123-4567"} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30" />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="company" className="text-sm font-medium text-gray-700">{isAmharic ? "ኩባንያ (አማራጭ)" : "Company (Optional)"}</label>
            <input id="company" name="company" type="text" value={form.company} onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))} placeholder={isAmharic ? "የድርጅት ስም (ከነበረ)" : "Acme Energy"} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30" />
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
              <option value="under-10k">{isAmharic ? "ከ$10k በታች" : "Under $10k"}</option>
              <option value="10k-50k">$10k - $50k</option>
              <option value="50k-100k">$50k - $100k</option>
              <option value="100k+">{isAmharic ? "ከ$100k በላይ" : "$100k+"}</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium text-gray-700">{isAmharic ? "መልዕክት" : "Message"}</label>
          <textarea id="message" name="message" rows={5} value={form.message} onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} placeholder={isAmharic ? "ስለ ንብረትዎ እና የኃይል ፍላጎትዎ ያስረዱን..." : "Tell us about your property and energy goals..."} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30" />
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

      {submitError && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}
    </form>
  );
}
