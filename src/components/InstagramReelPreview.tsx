"use client";

import { memo, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  Home,
  Search,
  Plus,
  Instagram,
  Loader,
} from "lucide-react";
import Image from "next/image";

interface Voice {
  id: string;
  name: string;
  description: string;
}

interface GameplayVariant {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
}

interface MusicTrack {
  id: string;
  name: string;
  description?: string;
  artist?: string;
  genre?: string;
  duration?: string;
}

interface InstagramReelPreviewProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  selectedVoice?: Voice;
  selectedBackground?: GameplayVariant;
  selectedMusic?: MusicTrack;
}

const InstagramReelPreview = ({
  isMuted,
  setIsMuted,
  selectedBackground,
}: InstagramReelPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      setIsLoading(true);
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        console.log("Video playback prevented by user interaction policies.");
      });
    }
  }, [selectedBackground]);

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsBuffering(false);
  };

  return (
    <div className="relative mx-auto w-[400px] border border-[#E5E7EB] rounded-lg overflow-hidden">
      {/* Content Area */}
      <div className="relative bg-black aspect-[9/16] w-full">
        {/* Background Video */}
        {selectedBackground?.videoUrl ? (
          <video
            ref={videoRef}
            src={selectedBackground.videoUrl}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            onLoadedData={handleVideoLoaded}
            onWaiting={handleWaiting}
            onPlaying={handlePlaying}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#2196f3] flex items-center justify-center">
            <span className="text-white/50">No video selected</span>
          </div>
        )}

        {/* Loading/Buffering Spinner */}
        {(isLoading || isBuffering) && selectedBackground?.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <Loader className="w-8 h-8 text-white shadow-2xl animate-spin" />
          </div>
        )}

        {/* Gradient Shadow Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[208px] bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10 pointer-events-none" />

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-20">
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-transparent"
              aria-label="Like"
            >
              <Heart className="w-8 h-7" />
            </Button>
            <span className="text-white text-sm">8</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-transparent"
              aria-label="Comment"
            >
              <MessageCircle className="w-8 h-7" />
            </Button>
            <span className="text-white text-sm">2</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-transparent rotate-45"
              aria-label="Share"
            >
              <Share2 className="w-8 h-7 -rotate-45" />
            </Button>
            <span className="text-white text-sm">224</span>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-16 left-0 right-0 p-4 z-20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/Instagramimage.png"
                alt="Profile"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white text-sm font-medium">Instagram</span>
            <button className="text-white text-sm font-semibold ml-1">
              Follow
            </button>
          </div>
          <p className="text-white text-sm mb-2">
            Have you ever wondered how speedrunners
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">
              song name • Original audio
            </span>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-8 bg-white z-20">
          <Button
            variant="ghost"
            size="icon"
            className="text-black hover:bg-transparent"
            aria-label="Home"
          >
            <Home className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-black hover:bg-transparent"
            aria-label="Search"
          >
            <Search className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-black hover:bg-transparent"
            aria-label="Create"
          >
            <Plus className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-black hover:bg-transparent"
            aria-label="Reels"
          >
            <Instagram className="w-8 h-8" />
          </Button>
          <div className="w-8 h-7 rounded-full overflow-hidden">
            <Image
              src="/Himanshu.png"
              alt="Profile"
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mute Toggle Button */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="text-white hover:bg-transparent"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(InstagramReelPreview);
