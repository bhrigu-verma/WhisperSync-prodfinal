"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const fade = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-16 sm:pt-32 sm:pb-24 text-center">
      {/* Pill badge */}
      <motion.div
        variants={fade(0)}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-neutral-300 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Now with multilingual support
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={fade(0.1)}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.1]"
      >
        AI Captions for{" "}
        <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Short{"\u2011"}Form Video
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        variants={fade(0.2)}
        initial="hidden"
        animate="visible"
        className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed"
      >
        Upload your reel. Get perfect captions in 30&nbsp;seconds.
        <br className="hidden sm:block" /> Multilingual. Accurate. Free to start.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fade(0.35)}
        initial="hidden"
        animate="visible"
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="#upload"
          className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
        >
          Get Started Free
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="#how-it-works"
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-200 transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        >
          <Play className="h-4 w-4" />
          Watch Demo
        </Link>
      </motion.div>

      {/* Social proof */}
      <motion.div
        variants={fade(0.5)}
        initial="hidden"
        animate="visible"
        className="mt-16 flex flex-col items-center gap-4"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
          Trusted by creators on
        </p>
        <div className="flex items-center gap-8">
          {/* YouTube */}
          <svg className="h-5 w-auto text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-label="YouTube">
            <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.542 3.5 12 3.5 12 3.5s-7.542 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.458 20.5 12 20.5 12 20.5s7.542 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
          </svg>
          {/* TikTok */}
          <svg className="h-5 w-auto text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
          </svg>
          {/* Instagram */}
          <svg className="h-5 w-auto text-neutral-500" viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 0 1 1.518.988c.458.458.78.96.988 1.518.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 0 1-.988 1.518 4.088 4.088 0 0 1-1.518.988c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 0 1-1.518-.988 4.088 4.088 0 0 1-.988-1.518c-.163-.46-.35-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 0 1 .988-1.518 4.088 4.088 0 0 1 1.518-.988c.46-.163 1.26-.35 2.43-.403C8.416 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.903.333 4.14.63a5.876 5.876 0 0 0-2.126 1.384A5.876 5.876 0 0 0 .63 4.14C.333 4.903.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.261 2.15.558 2.913a5.876 5.876 0 0 0 1.384 2.126A5.876 5.876 0 0 0 4.14 23.37c.763.297 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.15-.261 2.913-.558a5.876 5.876 0 0 0 2.126-1.384 5.876 5.876 0 0 0 1.384-2.126c.297-.763.5-1.635.558-2.913C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.058-1.278-.261-2.15-.558-2.913a5.876 5.876 0 0 0-1.384-2.126A5.876 5.876 0 0 0 19.86.63C19.097.333 18.225.13 16.947.072 15.667.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
  