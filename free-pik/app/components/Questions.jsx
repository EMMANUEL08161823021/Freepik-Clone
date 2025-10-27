"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CTAButton from "./ui/button";

const faqs = [
  {
    question: "What is SPACES?",
    answer:
      "SPACES is a feature film — a visually ambitious story about creators and an infinite canvas that changes their lives. It blends spectacle with intimate character moments for a cinematic experience.",
  },
  {
    question: "When is SPACES playing in theaters?",
    answer:
      "SPACES is now playing in select theaters nationwide. Release dates vary by city — check showtimes at your local cinema or use the 'Buy Tickets' button to find screenings near you.",
  },
  {
    question: "How can I buy tickets or get early access?",
    answer:
      "Use the Buy Tickets button to purchase single tickets, or choose a season pass for multiple screenings and special perks. Some theaters offer early access and advance screenings — availability depends on venue.",
  },
  {
    question: "Are there age restrictions or content warnings?",
    answer:
      "SPACES carries a PG-13 rating for thematic elements and brief intense sequences. Check local listings for any additional theater-specific age or content guidance.",
  },
  {
    question: "Is there a trailer or behind-the-scenes footage?",
    answer:
      "Yes — watch the official trailer and exclusive behind-the-scenes featurettes on the film's trailer page. Selected screenings will include a director's introduction or Q&A at participating venues.",
  },
  {
    question: "Can I book a private screening or group block?",
    answer:
      "Private screenings, group bookings, and corporate packages are available through the box office. Contact the box office for pricing, availability, and custom experiences.",
  },
  {
    question: "What COVID-19 / safety policies should I expect?",
    answer:
      "Theaters may have their own safety policies (masking, proof of vaccination, or capacity limits). We recommend checking the venue's website before attending for the latest guidance.",
  },
];

export default function Questions() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold text-[#F3F4F6] mb-4"
        >
          Frequently Asked Questions — <span className="text-primary">SPACES</span>
        </motion.h2>
        <p className="text-sm text-gray-400 mb-8">
          Wondering about showtimes, tickets, or special screenings? These are the most common audience questions. If you need help, our box office team is ready to assist.
        </p>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const btnId = `faq-btn-${idx}`;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.36 }}
                className="bg-card border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  id={btnId}
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                >
                  <span className="font-medium text-gray-100">{faq.question}</span>
                  <ChevronDown
                    className={`h-6 w-6 text-gray-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                      className="px-5 pb-4 text-gray-400 text-sm leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="border rounded-lg p-4 bg-card">
            <div className="text-primary font-extrabold text-2xl">$12.4M</div>
            <h4 className="mt-2 font-semibold text-[#F3F4F6]">Opening Weekend</h4>
            <p className="mt-1 text-sm text-gray-400">Strong opening across major markets — box office highlights for SPACES.</p>
          </article>

          <article className="border rounded-lg p-4 bg-card">
            <div className="text-primary font-extrabold text-2xl">92%</div>
            <h4 className="mt-2 font-semibold text-[#F3F4F6]">Critics Score</h4>
            <p className="mt-1 text-sm text-gray-400">Certified fresh — praised for visuals, score, and performances.</p>
          </article>

          <article className="border rounded-lg p-4 bg-card">
            <div className="text-primary font-extrabold text-2xl">1,200</div>
            <h4 className="mt-2 font-semibold text-[#F3F4F6]">Screens</h4>
            <p className="mt-1 text-sm text-gray-400">Now showing in theatres across the region — check your local listings.</p>
          </article>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-lg border bg-card p-6 text-center">
          <p className="text-sm text-gray-300 mb-4">Ready for the full cinematic experience? Grab your tickets, watch the trailer, or request a private screening for your group.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTAButton>
              Buy Tickets
            </CTAButton>
            <CTAButton variant="white">
              Watch Trailer
            </CTAButton>
            <a href="#" className="text-sm text-gray-400 hover:underline">
              Contact box office
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
