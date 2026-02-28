"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Globe, Download, Palette } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Millisecond Accuracy",
    description:
      "AI-powered transcription that syncs perfectly with every word. No drift, no manual adjustments needed.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description:
      "Hindi, English, Hinglish, and more. Built for the world's creators, not just English speakers.",
  },
  {
    icon: Download,
    title: "One-Click Export",
    description:
      "Download SRT, ASS, or burn captions directly into your video. Ready for TikTok, Reels, and Shorts.",
  },
  {
    icon: Palette,
    title: "Custom Styles",
    description:
      "Choose fonts, colors, outlines, and sizes. Make your captions match your brand in seconds.",
  },
];

const fade = (delay: number) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={fade(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400 mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Everything you need to caption like a pro
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-400">
            Stop wasting hours on manual captions. WhisperSync handles
            transcription, styling, and export — so you can focus on creating.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fade(0.1 + index * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10">
                  <Icon className="h-5 w-5 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
