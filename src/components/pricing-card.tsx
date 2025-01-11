"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CheckoutButton } from "@/components/checkout-button";

interface PricingCardProps {
  name: string;
  credits: number;
  price: number;
  features: string[];
  popular?: boolean;
  plan: "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
}

export function PricingCard({
  name,
  credits,
  price,
  features,
  popular = false,
  plan,
}: PricingCardProps) {
  return (
    <Card className={cn(
      "relative bg-white hover:shadow-lg transition-shadow",
      popular && "border-primary shadow-lg"
    )}>
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-black text-white text-sm font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className="text-center p-6">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground">/one-time</span>
        </div>
        <p className="text-muted-foreground font-medium">
          {credits} video credits
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ul className="space-y-3 mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-black" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <CheckoutButton 
          plan={plan}
          className={cn(
            "w-full",
            popular 
              ? "bg-black hover:bg-black/90" 
              : "bg-white border-2 border-black text-black hover:bg-black/5"
          )}
          variant={popular ? "default" : "outline"}
        />
      </CardContent>
    </Card>
  );
}