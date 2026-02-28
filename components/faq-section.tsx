"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What video formats are supported?",
    answer:
      "WhisperSync supports MP4 files up to 500 MB. We're optimized for short-form vertical videos like TikTok, Instagram Reels, and YouTube Shorts.",
  },
  {
    question: "How accurate is the transcription?",
    answer:
      "Our AI transcription is powered by AWS Transcribe which delivers over 95% accuracy for clear audio. For non-standard accents and multilingual content (Hindi, Hinglish), we outperform most competitors.",
  },
  {
    question: "What languages are supported?",
    answer:
      "Currently we support English, Hindi, and Hinglish (mixed Hindi-English) with automatic language detection. We're expanding to 50+ languages soon.",
  },
  {
    question: "Can I edit the captions after transcription?",
    answer:
      "Yes! You can edit individual words in the transcription table, adjust timing, change font size, text color, and outline color before exporting.",
  },
  {
    question: "What export formats are available?",
    answer:
      "You can download captions as SRT or ASS subtitle files, or burn the captions directly into your video as an MP4 — all with one click.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! Our free plan includes 3 videos per month with full transcription and export capabilities. No credit card required.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#0D0D0D]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400 mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
