"use client";

import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const plans = [
  {
    name: "Starter",
    description: "Perfect for trying out Createreel",
    price: 29,
    features: [
      "50 video generations",
      "720p video quality",
      "Basic video styles",
    ],
  },
  {
    name: "Professional",
    description: "For professionals and content creators",
    price: 79,
    popular: true,
    features: [
      "150 video generations",
      "1080p video quality",
      "Advanced video styles",
    ],
  },
  {
    name: "Enterprise",
    description: "For large teams and organizations",
    price: 199,
    features: [
      "500 video generations",
      "4K video quality",
      "All video styles",
    ],
  },
];

const MotionCard = motion(Card);

export default function PricingPage() {
  const currentPlan = {
    name: "Starter",
    videosUsed: 32,
    totalVideos: 50,
    renewalDate: "May 16, 2024",
    status: "active",
  };

  const handleCancelPlan = () => {
    // Handle plan cancellation logic here
    console.log("Plan cancelled");
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex-1 p-8 pt-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Billing & Plans</h1>
              <p className="text-muted-foreground">
                Manage your subscription and usage
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Current Plan Overview */}
            <Card className="p-6 border bg-card">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">
                      {currentPlan.name} Plan
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 font-medium px-3"
                    >
                      {currentPlan.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Renews on {currentPlan.renewalDate}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-sm">
                      Cancel Plan
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel {currentPlan.name} Plan</AlertDialogTitle>
                      <AlertDialogDescription className="space-y-4 pt-4">
                        <p>
                          Are you sure you want to cancel your subscription? Your plan will remain active until the end of your current billing period ({currentPlan.renewalDate}).
                        </p>
                        <div className="border-t border-border pt-4">
                          <p className="font-medium mb-2">After cancellation, you will lose access to:</p>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                              Remaining {currentPlan.totalVideos - currentPlan.videosUsed} video generations from your current plan
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                              {currentPlan.name === "Starter" ? "720p" : currentPlan.name === "Professional" ? "1080p" : "4K"} video quality settings
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                              {currentPlan.name === "Starter" ? "Basic" : currentPlan.name === "Professional" ? "Advanced" : "All"} video styles and templates
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                              Priority support and feature updates
                            </li>
                          </ul>
                        </div>
                        <div className="bg-muted p-3 rounded-lg text-sm">
                          <p>You can reactivate your subscription at any time to regain access to all features.</p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 sm:gap-0">
                      <AlertDialogCancel className="sm:mr-2">No, keep my plan</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleCancelPlan}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Yes, cancel plan
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted-foreground">
                      Video Generations Used
                    </span>
                    <span className="font-medium">
                      {currentPlan.videosUsed} / {currentPlan.totalVideos}
                    </span>
                  </div>
                  <Progress
                    value={(currentPlan.videosUsed / currentPlan.totalVideos) * 100}
                    className="h-2"
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <span className="text-yellow-900">
                      You've used {currentPlan.videosUsed} out of{" "}
                      {currentPlan.totalVideos} video generations.
                      {currentPlan.videosUsed > currentPlan.totalVideos * 0.8 &&
                        " Consider upgrading your plan to ensure uninterrupted service."}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Available Plans */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Available Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative bg-card rounded-xl p-6 transition-colors ${
                      plan.popular ? "border-2 border-primary" : "border"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center">
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <span className="text-3xl font-semibold">${plan.price}</span>
                      <span className="text-muted-foreground text-sm ml-1">/month</span>
                    </div>

                    <Button
                      className={`w-full mb-6 gap-2 ${
                        currentPlan.name === plan.name
                          ? "bg-secondary text-secondary-foreground cursor-not-allowed"
                          : plan.popular
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : "bg-card border-2 border-primary text-primary hover:bg-primary/10"
                      }`}
                      disabled={currentPlan.name === plan.name}
                    >
                      {currentPlan.name === plan.name ? "Current Plan" : "Upgrade"}
                    </Button>

                    <div className="space-y-4">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Suspense>
  );
}