"use client";

import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";
import HowitWorks from "@/components/how-it-works";
import UploadSection from "@/components/uploadSection";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import CTABanner from "@/components/cta-banner";
import { motion } from "framer-motion";
import DemoButton from "@/components/demo-button";


const Home = () => {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto flex flex-col justify-center"
      >
        <HeroSection />
        <UploadSection />
      </motion.div>
      <FeaturesSection />
      <HowitWorks />
      <TestimonialsSection />
      <Pricing />
      <FAQSection />
      <CTABanner />
      <Footer />
      <DemoButton />
    </section>
  );
};

export default Home;
