"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CTAButton from "./ui/button";

const faqs = [
  {
    question: "What is Creative Studio Hub?",
    answer:
      "Creative Studio Hub is a single workspace for teams to store assets, build templates, edit visuals and video, and publish across channels — designed to speed up production and reduce tool friction.",
  },
  {
    question: "How does collaboration work?",
    answer:
      "Projects support comments, version history, review requests and role-based permissions. Invite teammates, assign tasks, and approve assets without leaving the workspace.",
  },
  {
    question: "What file types and integrations are supported?",
    answer:
      "We support common design and media formats (PNG, JPG, SVG, MP4, MOV, WAV, Lottie). Integrations include Figma import, cloud storage (S3/Drive/Dropbox), and social scheduling APIs for major platforms.",
  },
  {
    question: "How do templates and repurposing work?",
    answer:
      "Create visual or video templates with placeholders. With one click you can repurpose a master asset into platform-ready sizes (9:16, 1:1, 16:9) and export variants for social, web or ads.",
  },
  {
    question: "How is my content protected and backed up?",
    answer:
      "Assets are encrypted in transit and at rest, stored in redundant cloud storage, and versioned automatically. Team and enterprise plans include SSO/SSO provisioning and audit logs.",
  },
  {
    question: "Can I publish directly from the platform?",
    answer:
      "Yes — we offer scheduling and direct posting for supported platforms. Where direct posting isn’t available, you can export optimized assets or use a webhook to integrate with your publishing pipeline.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer a freemium tier with limited storage and exports, monthly and yearly plans for individuals and teams, and custom enterprise pricing for SSO, SLAs and API-level access.",
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
          Frequently Asked Questions
        </motion.h2>
        <p className="text-sm text-foreground mb-8">
          Still curious? These common questions cover security, accessibility, and how to get started. If you don't find an answer, our support team is ready to help.
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
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <ChevronDown
                    className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                      className="px-5 pb-4 text-gray-700 text-sm leading-relaxed"
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
            <div className="text-indigo-600 font-extrabold text-2xl">700K+</div>
            <h4 className="mt-2 font-semibold text-[#F3F4F6]">Active Users</h4>
            <p className="mt-1 text-sm text-gray-600">People using NeuroWallet to manage money more accessibly.</p>
          </article>

          <article className="border rounded-lg p-4 bg-card">
            <div className="text-indigo-600 font-extrabold text-2xl">99.9%</div>
            <h4 className="mt-2 font-semibold text-[#F3F4F6]">Uptime</h4>
            <p className="mt-1 text-sm text-gray-600">Reliable service with enterprise-grade availability and backups.</p>
          </article>

          <article className="border rounded-lg p-4 bg-card">
            <div className="text-indigo-600 font-extrabold text-2xl">24/7</div>
            <h4 className="mt-2 font-semibold text-[#F3F4F6]">Support</h4>
            <p className="mt-1 text-sm text-gray-600">Dedicated accessibility-first support and guided onboarding.</p>
          </article>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-lg border bg-card p-6 text-center">
          <p className="text-sm text-gray-700 mb-4">Ready to try NeuroWallet? Start with a guided walkthrough and set up accessibility preferences in minutes.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CTAButton>
              Get started for free
            </CTAButton>
            {/* <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-gray-600 text-white px-5 py-2 text-sm font-semibold shadow hover:bg-indigo-700"
            >
              
            </a> */}
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Contact sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
