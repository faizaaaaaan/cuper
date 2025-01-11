"use client";

import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/pricing-card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    credits: 50,
    price: 29,
    features: [
      "50 video generations",
      "720p video quality",
      "Basic video styles",
      "Standard voices",
      "Email support",
    ],
    plan: "STARTER" as const,
  },
  {
    name: "Professional",
    credits: 150,
    price: 79,
    features: [
      "150 video generations",
      "1080p video quality",
      "Advanced video styles",
      "Premium voices",
      "Priority support",
      "Custom fonts",
    ],
    popular: true,
    plan: "PROFESSIONAL" as const,
  },
  {
    name: "Enterprise",
    credits: 500,
    price: 199,
    features: [
      "500 video generations",
      "4K video quality",
      "All video styles",
      "Premium voices",
      "24/7 support",
      "Custom fonts",
      "API access",
    ],
    plan: "ENTERPRISE" as const,
  },
];

export default function CreditsPage() {
  return (
    <div className="flex-1 p-8 pt-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-1">Buy Credits</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your video creation needs. All plans include
            access to our core features with varying levels of quality and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}