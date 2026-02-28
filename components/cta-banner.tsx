"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-24 bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-yellow-400/10 via-transparent to-purple-600/10 p-10 sm:p-14 text-center"
        >
          {/* Decorative blur */}
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start captioning — it&apos;s free
            </h2>
            <p className="max-w-xl mx-auto text-neutral-400 mb-8">
              Join thousands of creators who save hours every week with
              AI-powered captions. No credit card required.
            </p>
            <Link
              href="#upload"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-yellow-300"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
