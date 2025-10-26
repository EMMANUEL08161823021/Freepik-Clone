"use client";
import React, { useMemo, useState } from "react";
import CTAButton from "./ui/button";

const plansData = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 9,
    priceYearly: 90,
    description: "For solo creators getting started with basic features.",
    features: ["Up to 5 projects", "3GB storage", "Community support"],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 29,
    priceYearly: 290,
    description: "For freelancers and small teams that publish regularly.",
    features: ["Unlimited projects", "50GB storage", "Team access", "Priority support"],
    cta: "Start Pro",
    popular: true,
  },
  {
    id: "agency",
    name: "Agency",
    priceMonthly: 99,
    priceYearly: 990,
    description: "For agencies and teams that need scale, security and SLAs.",
    features: ["All Pro features", "SSO / SAML", "Dedicated support", "Custom contracts"],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"

  const plans = useMemo(() => plansData, []);

  const formatPrice = (n) => `$${n}`;

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#F3F4F6]">
              Plans that cover your needs
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Simple, predictable pricing for individuals and teams. Switch between monthly and yearly billing to see savings.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Billing</span>
            <div className="bg-gray-100 rounded-full p-1 flex items-center">
              <button
                onClick={() => setBilling("monthly")}
                aria-pressed={billing === "monthly"}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  billing === "monthly" ? "bg-card shadow" : "text-gray-600"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                aria-pressed={billing === "yearly"}
                className={`ml-1 px-3 py-1 rounded-full text-sm font-medium transition ${
                  billing === "yearly" ? "bg-card shadow" : "text-gray-600"
                }`}
              >
                Yearly
              </button>
            </div>
            {billing === "yearly" && (
              <div className="text-xs text-green-600 ml-3">Save 2 months</div>
            )}
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => {
            const price = billing === "monthly" ? p.priceMonthly : p.priceYearly;
            return (
              <article
                key={p.id}
                className={`relative border rounded-2xl p-6 flex flex-col shadow-sm bg-card hover:shadow-md transition ${
                  p.popular ? "ring-2 ring-indigo-200" : ""
                }`}
                aria-labelledby={`plan-${p.id}-title`}
              >
                {p.popular && (
                  <div className="absolute -top-3 right-3">
                    <span className="inline-block bg-[#D6862E] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}

                <h3 id={`plan-${p.id}-title`} className="text-lg font-semibold text-[#F3F4F6]">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{p.description}</p>

                <div className="mt-6 flex items-baseline gap-3">
                  <div className="text-3xl font-extrabold text-[#F3F4F6]">{formatPrice(price)}</div>
                  <div className="text-sm text-gray-500">{billing === "monthly" ? "/mo" : "/yr"}</div>
                </div>

                <div className="mt-6 mb-4">
                  <ul role="list" className="space-y-3 text-sm text-gray-700">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="flex-none h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <CTAButton
                    variant={p.popular ? "primary" : "white"}
                    className="w-full rounded-full px-4 py-2 text-sm font-semibold transition"
                    aria-label={`${p.cta} - ${p.name}`}
                  >
                    {p.cta}
                  </CTAButton>


                  <p className="mt-3 text-xs text-gray-500">
                    {p.id === "agency" ? "Custom contracts & invoices available." : "No credit card required for trial."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* small footer note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Prices shown in USD. Taxes may apply. Need a custom plan? <a href="#" className="text-indigo-600">Contact sales</a>.
        </div>
      </div>
    </section>
  );
}
