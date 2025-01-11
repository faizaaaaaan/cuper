"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Gamepad2, Video, ArrowRight, Sparkles, Files, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateVideo() {
  const router = useRouter();

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-semibold">Create Video</h1>
              <div className="bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                AI Powered
              </div>
            </div>
            <p className="text-muted-foreground">
              Choose your video creation path
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gameplay Video Option */}
          <div className="group relative bg-white hover:bg-gradient-to-b hover:from-secondary hover:to-transparent rounded-xl border p-8 transition-all duration-300 hover:shadow-lg hover:border-black/10">
            <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/[0.01] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Gamepad2 className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-black transition-colors">Gameplay Video</h2>
                <p className="text-muted-foreground">
                  Create engaging gameplay videos with AI narration. Perfect for gaming content and tutorials.
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  AI-powered script narration
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  Multiple gaming backgrounds
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  Background music options
                </li>
              </ul>
              <Button 
                className="w-full bg-black hover:bg-black/90 text-white transition-all duration-300 group-hover:shadow-md"
                onClick={() => router.push("/dashboard/gameplay")}
              >
                Create Gameplay Video
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Custom Video */}
          <div className="group relative bg-white hover:bg-gradient-to-b hover:from-secondary hover:to-transparent rounded-xl border p-8 transition-all duration-300 hover:shadow-lg hover:border-black/10">
            <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/[0.01] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Video className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-black transition-colors">Custom Video</h2>
                <p className="text-muted-foreground">
                  Create personalized videos with custom settings. Perfect for unique content creation.
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  Fully customizable settings
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  Advanced editing options
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  Professional templates
                </li>
              </ul>
              <Button 
                className="w-full bg-black hover:bg-black/90 text-white transition-all duration-300 group-hover:shadow-md"
                onClick={() => router.push("/dashboard/single")}
              >
                Create Custom Video
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Bulk Reel Generator */}
          <div className="group relative bg-white hover:bg-gradient-to-b hover:from-secondary hover:to-transparent rounded-xl border p-8 transition-all duration-300 hover:shadow-lg hover:border-black/10">
            <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-black/[0.01] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6">
                <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Files className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-black transition-colors">Bulk Reel Generator</h2>
                <p className="text-muted-foreground">
                  Generate multiple reels at once. Perfect for content creators and social media managers.
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  Batch processing
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  Multiple formats support
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-black" />
                  Automated optimization
                </li>
              </ul>
              <Button 
                className="w-full bg-black hover:bg-black/90 text-white transition-all duration-300 group-hover:shadow-md"
                onClick={() => router.push("/dashboard/bulk")}
              >
                Create Bulk Reels
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}