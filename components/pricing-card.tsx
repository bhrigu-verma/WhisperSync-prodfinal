"use client";
import React, { useState, useEffect } from "react";
import { Check, Sparkles, Star } from "lucide-react";
import axios from "axios";
import Script from "next/script";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { updatePlan } from "@/actions/updatePlan";
import { Plan } from "@prisma/client";

interface PricingPlan {
  name: string;
  price: string; // Price in USD by default
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  currentPlan: string;
  name: string;
  email: string;
}

export function PricingCard({ plan, currentPlan, name, email }: PricingCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currency, setCurrency] = useState<keyof typeof currencyMap>("USD");
  const [convertedPrice, setConvertedPrice] = useState(parseFloat(plan.price)); // Start with USD price

  const currencyMap = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
  };

  const convertCurrency = async (toCurrency: string) => {
    if (toCurrency === "USD") {
      setConvertedPrice(parseFloat(plan.price)); // Reset to base price in USD
      return;
    }

    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/USD`
      );

      const rate = response.data.rates[toCurrency];
      const newPrice = parseFloat(plan.price) * rate;
      setConvertedPrice(Math.round(newPrice)); // Update price with conversion
    } catch (error) {
      console.error("Error fetching currency rates:", error);
      toast.error("Failed to convert currency. Please try again.");
    }
  };

  useEffect(() => {
    convertCurrency(currency);
  }, [currency]);

  const isCurrentPlan = currentPlan === plan.name;
  const isPro = plan.popular;

  return (
    <div className="relative group">
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Gradient Border Effect */}
      <div 
        className={cn(
          "absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm",
          isPro ? "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-75" : "bg-gradient-to-r from-gray-600 to-gray-400"
        )}
      />
      
      <div
        className={cn(
          "relative flex flex-col justify-between h-full rounded-3xl p-8 transition-all duration-300 group-hover:scale-[1.02]",
          isPro 
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-purple-500/20" 
            : "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50",
          "backdrop-blur-xl shadow-2xl"
        )}
      >
        {/* Popular Badge */}
        {isPro && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <Star className="w-4 h-4 fill-current" />
              Most Popular
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            {isPro && <Sparkles className="w-5 h-5 text-purple-400" />}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {currencyMap[currency]}{convertedPrice}
              </span>
              <span className="text-gray-400 text-lg">/month</span>
            </div>
            {convertedPrice > 0 && (
              <p className="text-sm text-gray-400">
                Billed monthly • Cancel anytime
              </p>
            )}
          </div>
        </div>

        {/* Currency Selector */}
        <div className="mt-6 space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Currency
          </label>
          <div className="relative group/select">
            <select
              value={currency}
              onChange={(e) => {
                //@ts-expect-error: currency type
                setCurrency(e.target.value)
              }}
              className={cn(
                "w-full appearance-none rounded-xl px-4 py-3 text-white transition-all duration-200",
                "bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm",
                "border border-gray-600/50 hover:border-gray-500/70",
                "focus:outline-none focus:ring-2 focus:border-transparent",
                isPro ? "focus:ring-purple-500/50" : "focus:ring-blue-500/50",
                "group-hover/select:bg-gradient-to-r group-hover/select:from-gray-700/80 group-hover/select:to-gray-600/80"
              )}
              style={{
                backgroundImage: 'none'
              }}
            >
              <option value="USD" className="bg-gray-800 text-white">🇺🇸 USD - US Dollar</option>
              <option value="INR" className="bg-gray-800 text-white">🇮🇳 INR - Indian Rupee</option>
              <option value="EUR" className="bg-gray-800 text-white">🇪🇺 EUR - Euro</option>
              <option value="GBP" className="bg-gray-800 text-white">🇬🇧 GBP - British Pound</option>
              <option value="CAD" className="bg-gray-800 text-white">🇨🇦 CAD - Canadian Dollar</option>
              <option value="AUD" className="bg-gray-800 text-white">🇦🇺 AUD - Australian Dollar</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className={cn(
                "w-5 h-5 transition-colors duration-200",
                isPro ? "text-purple-400 group-hover/select:text-purple-300" : "text-gray-400 group-hover/select:text-gray-300"
              )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 space-y-4">
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            What's included
          </h4>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={feature} className="flex items-start gap-3 group/item">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-300 group-hover/item:text-white transition-colors duration-200">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <Button
            disabled={isProcessing || isCurrentPlan}
            className={cn(
              "w-full h-12 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
              isCurrentPlan
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : isPro
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25"
                : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl"
            )}
          >
            {isCurrentPlan ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Current Plan
              </span>
            ) : isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              `Get ${plan.name}`
            )}
          </Button>
          
          {convertedPrice > 0 && !isCurrentPlan && (
            <p className="text-center text-xs text-gray-400 mt-3">
              Start your free trial today 
            </p>
          )}
        </div>
      </div>
    </div>
  );
}