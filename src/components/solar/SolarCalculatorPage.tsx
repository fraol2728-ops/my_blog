"use client";

import { type ReactNode, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgeCheck,
  BarChart3,
  Building2,
  House,
  Mail,
  MapPin,
  Phone,
  Sun,
  User,
} from "lucide-react";

type PropertyType = "Residential" | "Commercial";

type FormData = {
  monthlyBill: number;
  location: string;
  propertyType: PropertyType;
};

type LeadForm = {
  name: string;
  phone: string;
  email: string;
};

const STEPS = ["Bill", "Location", "Property"];
const USD_TO_KWH = 8;
const KWH_PER_KW_SYSTEM = 120;
const PANEL_WATT = 400;
const COST_PER_KW = 800;
const BILL_REDUCTION = 0.9;

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

function CountUp({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      key={`${value}-${prefix}-${suffix}`}
      className="font-semibold"
    >
      {prefix}
      {value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </motion.span>
  );
}

export default function SolarCalculatorPage() {
  const [step, setStep] = useState(1);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const [form, setForm] = useState<FormData>({
    monthlyBill: 150,
    location: "California",
    propertyType: "Residential",
  });

  const [lead, setLead] = useState<LeadForm>({
    name: "",
    phone: "",
    email: "",
  });

  const results = useMemo(() => {
    const energyKwh = form.monthlyBill * USD_TO_KWH;
    const systemSizeKw = energyKwh / KWH_PER_KW_SYSTEM;
    const panels = Math.ceil((systemSizeKw * 1000) / PANEL_WATT);
    const cost = systemSizeKw * COST_PER_KW;
    const monthlySavings = form.monthlyBill * BILL_REDUCTION;
    const yearlySavings = monthlySavings * 12;
    const paybackYears = cost / yearlySavings;

    return {
      energyKwh,
      systemSizeKw,
      panels,
      cost,
      monthlySavings,
      yearlySavings,
      paybackYears,
    };
  }, [form]);

  const progress = (step / STEPS.length) * 100;

  const isStepValid =
    (step === 1 && form.monthlyBill > 0) ||
    (step === 2 && form.location.trim().length > 1) ||
    step === 3;

  return (
    <div className="bg-white text-neutral-900">
      <section className="mx-auto w-full max-w-5xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            <Sun className="h-4 w-4" />
            AI-Style Solar Estimator
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Estimate Your Solar Savings in Seconds
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            A smart assistant experience to estimate system size, cost, and payback instantly.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            layout
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm lg:col-span-2"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Quick Details</h2>
              <span className="text-sm text-neutral-500">
                Step {step} of {STEPS.length}
              </span>
            </div>

            <div className="mb-6 h-2 w-full rounded-full bg-neutral-100">
              <motion.div
                className="h-full rounded-full bg-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {step === 1 && (
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-neutral-700">
                      Monthly electricity bill (USD)
                    </span>
                    <input
                      type="number"
                      min={1}
                      value={form.monthlyBill}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, monthlyBill: Number(e.target.value) || 0 }))
                      }
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg outline-none ring-green-600 transition focus:ring"
                      placeholder="e.g. 180"
                    />
                  </label>
                )}

                {step === 2 && (
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-neutral-700">Your location</span>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-10 pr-4 outline-none ring-green-600 transition focus:ring"
                        placeholder="City or State"
                      />
                    </div>
                    <p className="mt-2 text-xs text-neutral-500">Recommended for your area based on sunlight trends.</p>
                  </label>
                )}

                {step === 3 && (
                  <div>
                    <span className="mb-2 block text-sm font-medium text-neutral-700">Property type</span>
                    <div className="grid grid-cols-2 gap-3">
                      {(["Residential", "Commercial"] as const).map((type) => {
                        const selected = form.propertyType === type;
                        const Icon = type === "Residential" ? House : Building2;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, propertyType: type }))}
                            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-medium transition ${
                              selected
                                ? "border-green-600 bg-green-50 text-green-700"
                                : "border-neutral-300 hover:border-green-400"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!isStepValid}
                onClick={() => setStep((prev) => Math.min(STEPS.length, prev + 1))}
                className="w-full rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {step === STEPS.length ? "See Results" : "Continue"}
              </button>
            </div>
          </motion.div>

          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm lg:col-span-3"
          >
            <div className="mb-5 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold">Your Solar Results</h2>
            </div>

            <p className="mb-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">
              Based on your input, solar can reduce your bill by <strong>90%</strong>.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <ResultCard label="System Size" value={<CountUp value={results.systemSizeKw} decimals={2} suffix=" kW" />} />
              <ResultCard label="Number of Panels" value={<CountUp value={results.panels} suffix=" panels" />} />
              <ResultCard label="Estimated Cost" value={<CountUp value={results.cost} prefix="$" decimals={0} />} />
              <ResultCard label="Monthly Savings" value={<CountUp value={results.monthlySavings} prefix="$" decimals={0} />} />
              <ResultCard label="Yearly Savings" value={<CountUp value={results.yearlySavings} prefix="$" decimals={0} />} />
              <ResultCard label="Payback Period" value={<CountUp value={results.paybackYears} decimals={1} suffix=" years" />} />
            </div>

            <div className="mt-6 space-y-3">
              <MetricBar label="Savings Impact" value={90} />
              <MetricBar label="Solar Fit Score" value={clamp(75 + results.systemSizeKw * 2, 0, 100)} />
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <h3 className="text-base font-semibold">Get Detailed Report</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Unlock a customized recommendation for {form.location} and {form.propertyType.toLowerCase()} usage.
              </p>

              <button
                type="button"
                onClick={() => setShowLeadForm((prev) => !prev)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 sm:w-auto"
              >
                {showLeadForm ? "Hide Form" : "Get Detailed Report"}
              </button>

              <AnimatePresence>
                {showLeadForm && (
                  <motion.form
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setLeadSubmitted(true);
                    }}
                    className="mt-4 space-y-3"
                  >
                    <InputWithIcon
                      icon={<User className="h-4 w-4" />}
                      placeholder="Full name"
                      value={lead.name}
                      onChange={(value) => setLead((prev) => ({ ...prev, name: value }))}
                    />
                    <InputWithIcon
                      icon={<Phone className="h-4 w-4" />}
                      placeholder="Phone number"
                      value={lead.phone}
                      onChange={(value) => setLead((prev) => ({ ...prev, phone: value }))}
                    />
                    <InputWithIcon
                      icon={<Mail className="h-4 w-4" />}
                      placeholder="Email address"
                      type="email"
                      value={lead.email}
                      onChange={(value) => setLead((prev) => ({ ...prev, email: value }))}
                    />

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3 font-medium text-white transition hover:bg-neutral-700"
                    >
                      Send Me Full Solar Report
                    </button>

                    {leadSubmitted && (
                      <p className="inline-flex items-center gap-1 text-sm text-green-700">
                        <BadgeCheck className="h-4 w-4" /> Thanks! Our team will contact you shortly.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ResultCard({ label, value }: { label: string; value: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-neutral-200 bg-white p-4"
    >
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-2 text-xl text-neutral-900">{value}</p>
    </motion.div>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-neutral-600">{label}</span>
        <span className="font-medium text-neutral-900">{Math.round(value)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-neutral-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamp(value, 0, 100)}%` }}
          transition={{ duration: 0.6 }}
          className="h-full rounded-full bg-green-600"
        />
      </div>
    </div>
  );
}

function InputWithIcon({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">{icon}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-300 py-3 pl-10 pr-4 outline-none ring-green-600 transition focus:ring"
        placeholder={placeholder}
      />
    </label>
  );
}
