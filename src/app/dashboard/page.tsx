"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, Video, ArrowRight, Sparkles, Files } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface FeatureOptionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  action: string;
  onClick: () => void;
  comingSoon: boolean;
}

// Feature Option Component
const FeatureOption = ({ icon: Icon, title, description, features, action, onClick, comingSoon }: FeatureOptionProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="space-y-4">
          <div className="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center">
            <Icon className="h-6 w-6 text-orange-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{title}</h2>
              {comingSoon && (
                <Badge variant="outline" className="text-primary">
                  Soon
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="mt-auto pt-6">
          <Button
            className={`w-full gap-2 ${
              comingSoon
                ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
            onClick={onClick}
            disabled={comingSoon}
          >
            {comingSoon ? "Coming Soon" : action}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Page Header Component
const PageHeader = () => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-semibold">
          Create Video
        </h1>
        <div className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          AI Powered
        </div>
      </div>
      <p className="text-muted-foreground">
        Choose your video creation path
      </p>
    </div>
  </div>
);

// Main Page Component
export default function Page() {
  const router = useRouter();

  const videoOptions = [
    {
      icon: Gamepad2,
      title: "Gameplay Video",
      description: "Create engaging gameplay videos with AI narration. Perfect for gaming content and tutorials.",
      features: [
        "AI-powered script narration",
        "Multiple gaming backgrounds",
        "Background music options"
      ],
      action: "Create Gameplay Video",
      onClick: () => router.push("/dashboard/gameplay"), // Updated to match your file structure
      comingSoon: false
    },
    {
      icon: Video,
      title: "Custom Video",
      description: "Create personalized videos with custom settings. Perfect for unique content creation.",
      features: [
        "Fully customizable settings",
        "Advanced editing options",
        "Advanced voice customization",
        "Custom Background Video",
        "Brand-aligned video settings",
        "Automated publishing scheduler"

      ],
      action: "Create Custom Video",
      onClick: () => router.push("/dashboard/single"), // Updated to match your file structure
      comingSoon: true
    },
    {
      icon: Files,
      title: "Bulk Reel Generator",
      description: "Generate multiple reels at once. Perfect for content creators and social media managers.",
      features: [
        "Mass video processing capabilities",
        "Multi-platform format support",
        "Advanced voice customization",
        "Custom Background Video",
        "Brand voice synchronization",
        "Automated publishing scheduler"
      ],
      action: "Generate Reels",
      onClick: () => router.push("/dashboard/bulk"), // Updated to match your file structure
      comingSoon: true
    }
  ];

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <div className="flex-1 p-8 pt-6">
        <div className="max-w-[1200px] mx-auto">
          <PageHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureOption {...option} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}