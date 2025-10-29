"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CTAButton from "./ui/button";

const stats = [
  {
    id: "opening",
    value: "$12.4M",
    title: "Opening Weekend",
    desc: "Strong opening across major markets — box office highlights for SPACES.",
  },
  {
    id: "critics",
    value: "92%",
    title: "Critics Score",
    desc: "Certified fresh — praised for visuals, score, and performances.",
  },
  {
    id: "screens",
    value: "1,200",
    title: "Screens",
    desc: "Now showing in theatres across the region — check your local listings.",
  },
];

const faqs = [
  {
    question: "What is SPACES?",
    answer:
      "SPACES is a cinematic platform that combines movie launches and on-demand streaming. It’s built for filmmakers and audiences — hosting premieres, exclusive releases, trailers, and a curated library you can stream anytime.",
  },
  {
    question: "How can I watch movies on SPACES?",
    answer:
      "Watch on desktop or mobile — stream films directly from the site or buy tickets for partnered physical screenings. Create an account, choose a title, and either stream immediately (if available) or purchase a ticket for a scheduled premiere.",
  },
  {
    question: "When does SPACES launch?",
    answer:
      "The frontend experience launches November 1. We’ll be rolling out premieres and streaming titles gradually — check the homepage or subscribe for launch-day updates and early-access notices.",
  },
  {
    question: "How do I buy tickets or get early access?",
    answer:
      "Use the ‘Buy Tickets’ button on any film page to purchase digital or in-person tickets. For early access, sign up for a season pass or join mailing lists for priority access to premieres, Q&As, and presales.",
  },
  {
    question: "What subscription or pricing options are available?",
    answer:
      "We offer flexible options: single-rental purchases, pay-per-premiere tickets, and subscription plans that give unlimited access to the streaming library plus member perks (early access, discounts, and exclusive extras). Pricing details are on the Plans page.",
  },
  {
    question: "Are there age ratings or content warnings?",
    answer:
      "Yes — every title shows its official rating and content advisories (violence, language, etc.). Please check the film page for detailed guidance and parental controls available on your account.",
  },
  {
    question: "Are trailers and behind-the-scenes available?",
    answer:
      "Absolutely. Each film page includes trailers, clips, and—where available—behind-the-scenes featurettes, director notes, and cast interviews. Exclusive extras are often unlocked for subscribers or ticket-holders.",
  },
  {
    question: "Can I book private screenings or group bookings?",
    answer:
      "Yes — private screenings and group packages are available. Visit our Contact or Bookings page to request pricing, availability and custom experiences for festivals, corporate events, or private showings.",
  },
];


export default function Questions() {
  const [openIndex, setOpenIndex] = useState(null);
  const reduce = useReducedMotion();

  // container variant for staggered entrance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // card entrance variant (used when reduced motion is not requested)
  const card = {
    hidden: { opacity: 0, y: 10 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: i * 0.06 },
    }),
  };

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
       <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
          variants={reduce ? undefined : container}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
          aria-hidden={false}
        >
          {stats.map((s, i) => (
            <motion.article
              key={s.id}
              className="border rounded-lg p-4 bg-card"
              custom={i}
              variants={reduce ? undefined : card}
              initial={reduce ? { opacity: 1, y: 0 } : undefined}
              animate={reduce ? undefined : undefined}
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -6,
                      scale: 1.01,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
                      transition: { duration: 0.25, ease: "easeOut" },
                    }
              }
            >
              <div className="text-primary font-extrabold text-2xl">{s.value}</div>
              <h4 className="mt-2 font-semibold text-[#F3F4F6]">{s.title}</h4>
              <p className="mt-1 text-sm text-gray-400">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>

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
