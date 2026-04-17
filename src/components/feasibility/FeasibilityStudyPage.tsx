"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Download,
  LineChart,
  MapPin,
  MessageCircle,
  Phone,
  PiggyBank,
  Send,
  Sun,
  Trees,
  Zap,
} from "lucide-react";
import { Button } from "@/components/button";

type LeadFormState = {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  projectType: string;
  message: string;
};

const analyzeItems = [
  {
    icon: Sun,
    title: "Solar Exposure",
    description: "Detailed sunlight and irradiance analysis to quantify generation potential.",
  },
  {
    icon: Trees,
    title: "Shading",
    description: "Trees, neighboring buildings, and roof obstructions mapped for production losses.",
  },
  {
    icon: Zap,
    title: "Energy Consumption",
    description: "Usage profile review using your monthly bills and load pattern behavior.",
  },
  {
    icon: Building2,
    title: "System Size Recommendation",
    description: "Optimal panel and inverter sizing based on your goals and site constraints.",
  },
  {
    icon: PiggyBank,
    title: "ROI & Savings",
    description: "Cost, payback timeline, and projected savings model for better decisions.",
  },
];

const steps = [
  "Submit your details",
  "Site & data analysis",
  "Technical evaluation",
  "Report delivery",
];

const benefits = [
  "Avoid costly design and procurement mistakes before installation",
  "Get accurate system sizing tailored to your property and load",
  "Maximize long-term system efficiency and production output",
  "Understand ROI clearly with realistic cost and savings projections",
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function FeasibilityStudyPage() {
  const [form, setForm] = useState<LeadFormState>({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    projectType: "Residential",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [calculator, setCalculator] = useState({
    location: "Juba",
    monthlyBill: "150",
  });

  const estimate = useMemo(() => {
    const monthly = Number.parseFloat(calculator.monthlyBill) || 0;
    const sizeKw = Math.max(1, monthly / 28);
    const yearlySavings = monthly * 12 * 0.62;

    return {
      sizeKw: sizeKw.toFixed(1),
      yearlySavings: Math.round(yearlySavings).toLocaleString(),
    };
  }, [calculator.monthlyBill]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      company: form.location,
      service: `Feasibility Study - ${form.projectType}`,
      budget: calculator.monthlyBill ? `$${calculator.monthlyBill}/month bill` : undefined,
      message: `${form.message}\n\nLocation: ${form.location}`,
      source: "feasibility-study-page",
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
      setForm({
        fullName: "",
        phone: "",
        email: "",
        location: "",
        projectType: "Residential",
        message: "",
      });
    } catch (error) {
      console.error("Lead form submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-emerald-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(22,163,74,0.18),_rgba(255,255,255,0)_50%)]" />
        <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <p className="ui-kicker">Solar Feasibility & Site Assessment</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Know Before You Install Solar
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              We analyze your site, energy usage, and solar potential to design the most
              efficient and cost-effective system.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#lead-form" className="bg-[#16a34a] hover:bg-green-500">
                Get Free Assessment
              </Button>
              <Button href="#sample-report" variant="secondary">
                See Sample Report
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="ui-card relative overflow-hidden rounded-3xl p-8"
          >
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-green-100 blur-2xl" />
            <div className="absolute -bottom-16 -left-14 h-44 w-44 rounded-full bg-emerald-100 blur-2xl" />
            <div className="relative">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-700">Solar Potential Score</p>
                <p className="mt-2 text-4xl font-bold text-emerald-800">92%</p>
                <p className="mt-2 text-sm text-emerald-700">Excellent roof orientation + low shading</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Estimated System
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">5.4 kW</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Yearly Savings
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-900">$1,120</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center sm:grid-cols-3">
          {["Trusted solar experts", "300+ projects completed", "Serving East Africa"].map((item) => (
            <p key={item} className="text-sm font-semibold text-slate-700 sm:text-base">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="section-shell pt-10">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="ui-kicker">What We Analyze</p>
          <h2 className="ui-title">A complete technical + financial evaluation</h2>
        </motion.div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {analyzeItems.map((item, index) => (
            <motion.article
              key={item.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="ui-card ui-card-hover rounded-2xl p-6"
            >
              <div className="mb-4 inline-flex rounded-xl bg-green-50 p-3 text-green-700">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 sm:px-10">
          <p className="ui-kicker text-center">How It Works</p>
          <div className="mt-8 hidden grid-cols-4 gap-6 lg:grid">
            {steps.map((step, index) => (
              <div key={step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                  {index + 1}
                </div>
                {index < steps.length - 1 ? (
                  <div className="absolute left-[58%] top-6 h-0.5 w-full bg-green-200" />
                ) : null}
                <p className="text-sm font-semibold text-slate-700">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4 lg:hidden">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sample-report" className="section-shell pt-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="ui-kicker">Sample Report</p>
            <h2 className="ui-title">Preview the insights you get before investing</h2>
            <p className="ui-subtitle">
              Your report includes site observations, preliminary system design, generation
              estimates, and ROI projections so you can move forward with confidence.
            </p>
            <Button href="#" className="mt-8 bg-[#16a34a] hover:bg-green-500">
              <Download className="mr-2 h-4 w-4" />
              Download Sample
            </Button>
          </div>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="ui-card overflow-hidden rounded-3xl"
          >
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-700">
              Feasibility Summary · Site A
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Energy Output</p>
                <LineChart className="mt-3 h-20 w-full text-green-600" />
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Financial Model</p>
                <BarChart3 className="mt-3 h-20 w-full text-green-600" />
              </div>
              <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">System Layout</p>
                <div className="mt-3 grid grid-cols-8 gap-1">
                  {Array.from({ length: 40 }).map((_, index) => (
                    <span
                      key={index}
                      className="h-4 rounded-sm bg-gradient-to-br from-green-400 to-emerald-600"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="grid gap-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-green-50 p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="ui-kicker">Benefits</p>
            <h2 className="ui-title">Reduce risk and improve planning before installation</h2>
            <p className="ui-subtitle">
              Feasibility studies reduce project risk and improve planning before installation.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 text-green-600" />
                  <p className="text-slate-700">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="ui-card rounded-2xl border-green-100 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs uppercase tracking-wide text-green-700">Risk Reduction</p>
                <p className="mt-2 text-2xl font-bold text-green-800">High</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs uppercase tracking-wide text-green-700">Planning Accuracy</p>
                <p className="mt-2 text-2xl font-bold text-green-800">+38%</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <p className="text-sm font-semibold text-slate-700">Recommended next step</p>
                <p className="mt-2 text-sm text-slate-600">
                  Book your free feasibility call to validate assumptions and lock your
                  implementation roadmap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="ui-card rounded-3xl border-green-100 p-8">
          <div className="mb-8 text-center">
            <p className="ui-kicker">Mini Calculator</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Quick savings estimate</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Location
                <div className="relative mt-1">
                  <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    className="ui-input w-full pl-9"
                    value={calculator.location}
                    onChange={(event) =>
                      setCalculator((prev) => ({ ...prev, location: event.target.value }))
                    }
                    placeholder="City"
                  />
                </div>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Monthly electricity bill (USD)
                <input
                  className="ui-input mt-1 w-full"
                  type="number"
                  min="0"
                  value={calculator.monthlyBill}
                  onChange={(event) =>
                    setCalculator((prev) => ({ ...prev, monthlyBill: event.target.value }))
                  }
                />
              </label>
            </div>
            <div className="rounded-2xl bg-green-50 p-6">
              <p className="text-sm font-semibold text-green-700">Estimated System Size</p>
              <p className="mt-2 text-4xl font-bold text-green-800">{estimate.sizeKw} kW</p>
              <p className="mt-6 text-sm font-semibold text-green-700">Estimated Annual Savings</p>
              <p className="mt-2 text-3xl font-bold text-green-800">${estimate.yearlySavings}</p>
              <p className="mt-4 text-sm text-green-700">
                Approximation based on average tariff and consumption assumptions in
                {" "}
                {calculator.location || "your area"}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="lead-form" className="section-shell pt-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <p className="ui-kicker">Request Assessment</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Request Free Feasibility Study</h2>
          </div>

          {isSubmitted ? (
            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
              <p className="font-semibold text-green-800">Thanks! Your request has been received.</p>
              <p className="mt-1 text-sm text-green-700">We&apos;ll contact you within one business day.</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
            <input
              required
              className="ui-input"
              placeholder="Name"
              value={form.fullName}
              onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
            />
            <input
              required
              className="ui-input"
              placeholder="Phone"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            />
            <input
              required
              type="email"
              className="ui-input"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            />
            <input
              required
              className="ui-input"
              placeholder="Location"
              value={form.location}
              onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
            />
            <select
              className="ui-input sm:col-span-2"
              value={form.projectType}
              onChange={(event) => setForm((prev) => ({ ...prev, projectType: event.target.value }))}
            >
              <option>Residential</option>
              <option>Commercial</option>
              <option>Industrial</option>
              <option>Institutional</option>
            </select>
            <textarea
              required
              className="ui-input min-h-28 sm:col-span-2"
              placeholder="Tell us about your energy goals and property"
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            />
            <Button
              type="submit"
              className="ui-glow-btn sm:col-span-2 sm:justify-center bg-[#16a34a] hover:bg-green-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Free Feasibility Study"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Start Your Solar Journey Today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-green-50">
            Build with confidence using a data-backed solar feasibility study before you invest.
          </p>
          <Button
            href="#lead-form"
            className="mt-8 border border-white/30 bg-white text-green-700 hover:bg-green-50"
          >
            Get Your Free Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <motion.a
        href="#lead-form"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-[#16a34a] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-green-900/20 lg:hidden"
      >
        Get Free Assessment
      </motion.a>

      <motion.a
        href="https://wa.me/211982004848"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-20 right-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-lg shadow-green-900/20"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </motion.a>

      <a
        href="tel:+211982004848"
        className="fixed bottom-5 right-5 z-30 hidden h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-green-700 shadow-lg lg:inline-flex"
        aria-label="Call us"
      >
        <Phone className="h-5 w-5" />
      </a>
    </main>
  );
}
