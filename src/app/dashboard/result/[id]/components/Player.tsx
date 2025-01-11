"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Twitter, Facebook, Instagram, Download } from "lucide-react";
import { toast } from "sonner";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";

interface Video {
  title: string;
  timestamp: Date;
  voice: string;
  script: string;
  background: string;
  audioUrl: string;
  videoUrl?: string | null;
  music: string;
  captions: Caption[];
}

interface Caption {
  start: number;
  end: number;
  text: string;
  speaker: string | null;
}

export default function PlayerComponent({ video }: { video: Video }) {
  const [durationInFrames, setDurationInFrames] = React.useState(120);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
            toast.success("Download complete");
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="w-full lg:w-[400px] bg-black">
        <div className="w-full h-full relative">
          <Player
            component={RemotionVideo}
            durationInFrames={Number(durationInFrames.toFixed(0))}
            compositionWidth={400}
            compositionHeight={710}
            fps={30}
            controls={true}
            inputProps={{
              background: video?.background,
              audioUrl: video?.audioUrl,
              music: video?.music,
              captions: video?.captions,
              setDurationInFrames: setDurationInFrames,
            }}
          />
        </div>
      </div>

      <div className="flex-1 max-w-xl">
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs mb-4">
              <span className="w-1 h-1 rounded-full bg-gray-400 mr-2" />
              Ready to share
            </div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              {video?.title}
            </h1>
            <p className="text-gray-500 text-sm">
              Your video is ready. Download or share it now.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Voice</p>
              <p className="font-medium">{video?.voice}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Music</p>
              <p className="font-medium">{video?.music}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Timestamp</p>
              <p className="font-medium">
                {new Date(video.timestamp).toLocaleString("en-UK", {
                  month: "2-digit",
                  day: "numeric",
                  year: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Duration</p>
              <p className="font-medium">
                {(Number(durationInFrames.toFixed(0)) / 30).toFixed(1)}s
              </p>
            </div>
          </div>

          {isDownloading ? (
            <div className="space-y-2">
              <div className="w-full h-11 relative bg-gray-100 rounded">
                <div
                  className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-200 rounded"
                  style={{ width: `${downloadProgress}%` }}
                />
                <div
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-sm font-medium transition-colors duration-200"
                  style={{ color: downloadProgress >= 50 ? "white" : "black" }}
                >
                  {downloadProgress}%
                </div>
              </div>
              <p className="text-xs">
                <span className="text-red-500">*</span>
                <span className="text-gray-600">
                  {" "}
                  Do not refresh. ETA will be max 1 minute
                </span>
              </p>
            </div>
          ) : (
            <Button className="w-full h-11" onClick={handleDownload}>
              <Download size={18} className="mr-2" />
              Download Video
            </Button>
          )}

          <div className="space-y-3">
            <p className="text-sm text-gray-500">Upload to social media</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: Twitter,
                  label: "Twitter",
                  color: "hover:text-blue-400",
                },
                {
                  icon: Facebook,
                  label: "Facebook",
                  color: "hover:text-blue-600",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  color: "hover:text-pink-500",
                },
              ].map((platform) => (
                <div key={platform.label} className="relative group">
                  <Button
                    variant="outline"
                    className={`w-full transition-all ${platform.color}`}
                    disabled
                  >
                    <platform.icon size={18} />
                  </Button>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Coming Soon
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Your video is securely stored and will be available for the next 30
            days. Make sure to download it before then!
          </p>
        </div>
      </div>
    </div>
  );
}
