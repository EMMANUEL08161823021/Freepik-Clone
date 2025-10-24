
"use client"
import React from 'react'
import { Mountains_of_Christmas } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from "lucide-react";

import { useState } from 'react';


const faqs = [
  {
    question: "What is NeuroWallet?",
    answer:
      "NeuroWallet is an accessible digital banking app that combines biometrics, voice commands, and PIN fallback to make banking inclusive for everyone.",
  },
  {
    question: "Is NeuroWallet secure?",
    answer:
      "Yes! All transactions are protected with multi-layered authentication, encryption, and optional PIN verification.",
  },
  {
    question: "Can visually impaired users use NeuroWallet?",
    answer:
      "Absolutely. NeuroWallet supports voice commands, screen readers, and high-contrast UI for visually impaired users.",
  },
  {
    question: "Can visually impaired users use NeuroWallet?",
    answer:
      "Absolutely. NeuroWallet supports voice commands, screen readers, and high-contrast UI for visually impaired users.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply sign up with your email, set up biometrics or a PIN, and you’re ready to start banking securely.",
  },
];

const Questions = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="bg-gray-50">
            <br/>
            <br/>
            <div className="max-w-5xl px-2 mx-auto text-left">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl py-3 font-semibold text-gray-900"
            >
                Frequently Asked Questions
            </motion.h2>

            {/* FAQ List */}
            <div className="mt-10 space-y-4 text-left">
                {faqs.map((faq, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                >
                    <button
                    className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none hover:bg-gray-50"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    >
                    <span className="font-medium text-gray-800">
                        {faq.question}
                    </span>
                    <ChevronDown
                        className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
                        openIndex === idx ? "rotate-180" : ""
                        }`}
                    />
                    </button>

                    <AnimatePresence>
                    {openIndex === idx && (
                        <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-4 text-gray-600 text-xs leading-relaxed"
                        >
                        {faq.answer}
                        </motion.div>
                    )}
                    </AnimatePresence>
                </motion.div>
                ))}
            </div>
            </div>
            <br/>
            <br/>
            <div className='max-w-5xl px-2 mx-auto text-left flex flex-col gap-3 md:flex-row'>
                <div className='border p-3'>
                    <h2>1 billion</h2>
                    <h4 className='text-gray-900 text-sm'>Lorem, ipsum, and dolors.</h4>
                    <p className='text-gray-900 text-xs'>Lorem ipsum dolor sit amet consectetur, adipisicing elit quae omnis ex?</p>
                </div>
                <div className='border p-3'>
                    <h2>1 billion</h2>
                    <h4 className='text-gray-900 text-sm'>Lorem, ipsum, and dolors.</h4>
                    <p className='text-gray-900 text-xs'>Lorem ipsum dolor sit amet consectetur, adipisicing elit quae omnis ex?</p>
                </div>
                <div className='border p-3'>
                    <h2>1 billion</h2>
                    <h4 className='text-gray-900 text-sm'>Lorem, ipsum, and dolors.</h4>
                    <p className='text-gray-900 text-xs'>Lorem ipsum dolor sit amet consectetur, adipisicing elit quae omnis ex?</p>
                </div>
            </div>
            <br/>
            <br/>
            <div className='text-center p-3 flex flex-col gap-3 border'>
                <p className='text-xs text-gray-900'>Your vision, elevated</p>

                <div>
                    <button className="px-4 py-2 cursor-pointer rounded-full bg-gray-600 text-white text-sm font-medium shadow hover:bg-gray-600 transition-all duration-200">
                        Get started for free
                    </button>
                </div>

            </div>
            <br/>
            <br/>
        </section>
    )
}

export default Questions