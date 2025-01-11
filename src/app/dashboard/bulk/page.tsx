"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BulkVideoForm } from "@/components/bulk-video-form";
import { BulkVideoPreview } from "@/components/bulk-video-preview";
import { BulkSettings } from "@/components/bulk-settings";
import { useRouter } from "next/navigation";
import { ArrowRight, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MAX_VIDEOS = 10;

export interface BulkVideo {
  id: string;
  topic: string;
  description?: string;
  style: string;
  duration: number;
  voice?: string;
  subtitlePosition?: "top" | "middle" | "bottom";
  font?: string;
}

export interface BulkSettings {
  voice: string;
  subtitlePosition: "top" | "middle" | "bottom";
  font: string;
  applyToAll: boolean;
}

export default function BulkCreatePage() {
  const router = useRouter();
  const [videos, setVideos] = useState<BulkVideo[]>([]);
  const [settings, setSettings] = useState<BulkSettings>({
    voice: "male_us",
    subtitlePosition: "bottom",
    font: "inter",
    applyToAll: true,
  });

  const handleAddVideo = (video: BulkVideo) => {
    if (videos.length >= MAX_VIDEOS) {
      toast.error(`You can only create up to ${MAX_VIDEOS} videos at once`);
      return;
    }

    const videoWithSettings = settings.applyToAll
      ? {
          ...video,
          voice: settings.voice,
          subtitlePosition: settings.subtitlePosition,
          font: settings.font,
        }
      : video;
    setVideos([...videos, videoWithSettings]);
  };

  const handleRemoveVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  const handleUpdateVideo = (id: string, updates: Partial<BulkVideo>) => {
    setVideos(videos.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const handleGenerateAll = () => {
    if (videos.length === 0) {
      toast.error("Add at least one video before generating");
      return;
    }
    toast.success(`Generating ${videos.length} videos`);
    router.push("/dashboard/history");
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target?.result as string;
        const lines = csv.split("\n");
        const newVideos: BulkVideo[] = lines.slice(1).map((line, index) => {
          const [topic, description, style, duration] = line.split(",");
          return {
            id: `csv-${index}`,
            topic: topic?.trim() || "",
            description: description?.trim() || "",
            style: style?.trim() || "cinematic",
            duration: parseInt(duration?.trim() || "60", 10),
            ...(settings.applyToAll && {
              voice: settings.voice,
              subtitlePosition: settings.subtitlePosition,
              font: settings.font,
            }),
          };
        }).filter(v => v.topic);

        if (videos.length + newVideos.length > MAX_VIDEOS) {
          toast.error(`You can only create up to ${MAX_VIDEOS} videos at once`);
          return;
        }

        setVideos([...videos, ...newVideos]);
        toast.success(`Imported ${newVideos.length} videos`);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-1">Bulk Create</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Generate multiple videos at once
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" />
                Import CSV
              </Button>
            </div>
            <Button
              className="bg-black hover:bg-black/90 flex-1 sm:flex-none"
              onClick={handleGenerateAll}
              disabled={videos.length === 0}
            >
              Generate All ({videos.length})
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You can create up to {MAX_VIDEOS} videos at once. Currently using {videos.length} of {MAX_VIDEOS} slots.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[1fr,400px]">
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <BulkVideoPreview
                videos={videos}
                onRemove={handleRemoveVideo}
                onUpdate={handleUpdateVideo}
                maxVideos={MAX_VIDEOS}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <BulkVideoForm 
                onAdd={handleAddVideo} 
                disabled={videos.length >= MAX_VIDEOS} 
              />
            </div>
            <div className="bg-white rounded-xl border p-4 sm:p-6">
              <BulkSettings
                settings={settings}
                onChange={setSettings}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}