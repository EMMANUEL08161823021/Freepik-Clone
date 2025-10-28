"use client";
import React, { useMemo, useState } from "react";
import CTAButton from "./ui/button";

import { motion } from "framer-motion";

const plansData = [
  {
    id: "standard",
    name: "Standard",
    priceMonthly: 9,
    priceYearly: 90,
    description: "Perfect for solo viewers — comfortable seating and standard concessions.",
    features: ["Standard seating", "Digital ticket", "Access to trailers"],
    cta: "Buy Standard",
  },
  {
    id: "premium",
    name: "Premium",
    priceMonthly: 29,
    priceYearly: 290,
    description: "Upgraded seats, early access and a complimentary drink — ideal for date night.",
    features: ["Premium seating", "Free drink", "Early access", "Priority entry"],
    cta: "Get Premium",
    popular: true,
  },
  {
    id: "vip",
    name: "VIP Package",
    priceMonthly: 99,
    priceYearly: 990,
    description: "The full cinematic experience — private lounge access, concierge booking and group perks.",
    features: ["Lounge access", "Concierge booking", "Group discounts", "Exclusive screenings"],
    cta: "Contact Box Office",
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"

  const plans = useMemo(() => plansData, []);

  const formatPrice = (n) => `$${n}`;

  return (
    <section id="pricing" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-semibold text-[#F3F4F6]">
              Choose how you want to experience <span className="text-primary">SPACES</span>
            </motion.h2>
            <p className="mt-2 text-sm text-gray-400 max-w-2xl">
              Simple, transparent ticketing — pick a single-show ticket or save with a season pass. Compare options and choose what fits your night out.
            </p>
          </div>

          {/* Ticket type toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Ticket Type</span>
            <div className="bg-gray-100 rounded-full p-1 flex items-center">
              <button
                onClick={() => setBilling("monthly")}
                aria-pressed={billing === "monthly"}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  billing === "monthly" ? "bg-card shadow" : "text-gray-400"
                }`}
              >
                Single
              </button>
              <button
                onClick={() => setBilling("yearly")}
                aria-pressed={billing === "yearly"}
                className={`ml-1 px-3 py-1 rounded-full text-sm font-medium transition ${
                  billing === "yearly" ? "bg-card shadow" : "text-gray-400"
                }`}
              >
                Season
              </button>
            </div>
            {billing === "yearly" && (
              <div className="text-sm text-green-600 ml-3">Season pass</div>
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
                    <span className="inline-block bg-[#D6862E] text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}

                <h3 id={`plan-${p.id}-title`} className="text-lg font-semibold text-[#F3F4F6]">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400">{p.description}</p>

                <div className="mt-6 flex items-baseline gap-3">
                  <div className="text-3xl font-extrabold text-[#F3F4F6]">{formatPrice(price)}</div>
                  <div className="text-sm text-gray-400">{billing === "monthly" ? "/ticket" : "/season"}</div>
                </div>

                <div className="mt-6 mb-4">
                  <ul role="list" className="space-y-3 text-sm text-gray-700">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="flex-none h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-400">{f}</span>
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

                  <p className="mt-3 text-sm text-gray-400">
                    {p.id === "vip" ? "Custom VIP packages & group bookings available." : "No credit card required to reserve a ticket."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* small footer note */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Prices shown in USD. Booking fees and taxes may apply. Need group pricing or a private screening? <a href="#" className="text-primary">Contact the box office</a>.
        </div>
      </div>
    </section>
  );
}
