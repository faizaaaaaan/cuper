"use client";

import { useState } from "react";
import { VideoStep } from "@/components/video-step";
import { OptimizeStep } from "@/components/optimize-step";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check, Video, Wand2 } from "lucide-react";

const steps = [
  {
    id: "video",
    name: "Video Settings",
    icon: Video,
  },
  {
    id: "optimize",
    name: "Optimize Video",
    icon: Wand2,
  },
];

export default function CreateVideo() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("video");
  const [videoData, setVideoData] = useState({
    videoSettings: null,
    optimizeSettings: null,
  });

  const handleVideoSettings = (data: any) => {
    setVideoData(prev => ({ ...prev, videoSettings: data }));
    setCurrentStep("optimize");
  };

  const handleOptimizeSettings = (data: any) => {
    setVideoData(prev => ({ ...prev, optimizeSettings: data }));
    router.push("/dashboard/script");
  };

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Create</h1>
            <p className="text-muted-foreground">
              Generate professional videos with our AI-powered platform
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-8">
          <div className="flex overflow-x-auto lg:block lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => {
                  if (step.id === "video" && videoData.videoSettings) {
                    setCurrentStep("video");
                  }
                }}
                className={cn(
                  "flex-shrink-0 lg:w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-sm whitespace-nowrap",
                  "mr-2 last:mr-0 lg:mr-0",
                  currentStep === step.id
                    ? "bg-white shadow-sm text-black font-medium"
                    : "hover:bg-white text-muted-foreground",
                  currentStep === "optimize" && step.id === "video" && "text-black"
                )}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full",
                    currentStep === step.id
                      ? "bg-black/10"
                      : "bg-secondary",
                    currentStep === "optimize" && step.id === "video" && "bg-black/10"
                  )}
                >
                  {currentStep === "optimize" && step.id === "video" ? (
                    <Check className="h-4 w-4 text-black" />
                  ) : (
                    <step.icon className={cn(
                      "h-4 w-4",
                      currentStep === step.id ? "text-black" : "text-muted-foreground"
                    )} />
                  )}
                </div>
                <span>{step.name}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl border p-8 min-h-[600px]">
            {currentStep === "video" ? (
              <VideoStep onNext={handleVideoSettings} />
            ) : (
              <OptimizeStep 
                onBack={() => setCurrentStep("video")} 
                onComplete={handleOptimizeSettings}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}