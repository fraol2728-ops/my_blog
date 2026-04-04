import React from "react";
import { Gradient } from "./gradient";
import Container from "./container";
import { Button } from "./button";

export default function Footer() {
  return (
    <footer>
      <Gradient className="relative">
        <div className="absolute inset-2 rounded-4xl bg-white/80" />
        <Container className="relative py-16 text-center sm:py-24">
          <div>
            <p className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-emerald-700">
              Go Solar Today
            </p>
            <p className="mx-auto mt-6 text-3xl text-gray-950 sm:text-5xl tracking-tight font-medium">
              Build a cleaner future with reliable solar power.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm/6 text-gray-500">
              From first consultation to long-term maintenance, SolarPeak helps
              homeowners and businesses transition to efficient renewable energy.
            </p>
            <div className="mt-6">
              <Button className="w-full sm:w-auto bg-emerald-700 data-[hover]:bg-emerald-600" href="/contact">
                Book a Consultation
              </Button>
            </div>
          </div>
        </Container>
      </Gradient>
    </footer>
  );
}
