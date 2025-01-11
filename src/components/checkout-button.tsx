"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CheckoutButtonProps {
  plan: "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
  className?: string;
  variant?: "default" | "outline";
}

export function CheckoutButton({ plan, className, variant = "default" }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // const checkoutUrl = `https://${STORE_ID}.lemonsqueezy.com/checkout/buy/${PRODUCT_IDS[plan]}`;
      const checkoutUrl = `https://google.com`;
      
      // Open checkout in a new window
      window.open(checkoutUrl, "_blank");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className}
      variant={variant}
    >
      {isLoading ? "Loading..." : "Get Started"}
    </Button>
  );
}