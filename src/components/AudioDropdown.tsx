// components/AudioDropdown.tsx
"use client";

import * as React from "react";
import { Check, Play, Pause, ChevronDown } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

interface AudioOption {
  id: string;
  name: string;
  description?: string;
  audioUrl?: string;
  disabled?: boolean;
}

interface AudioDropdownProps {
  options: AudioOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

export default function AudioDropdown({
  options,
  value,
  onChange,
  label,
  className
}: AudioDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [playingId, setPlayingId] = React.useState<string | null>(null);
  const audioRefs = React.useRef<{ [key: string]: HTMLAudioElement }>({});

  const selectedOption = options.find(opt => opt.id === value);

  const handlePlay = (id: string, audioUrl?: string) => {
    if (!audioUrl) return;
    
    if (playingId === id) {
      audioRefs.current[id]?.pause();
      setPlayingId(null);
    } else {
      // Stop any currently playing audio
      if (playingId && audioRefs.current[playingId]) {
        audioRefs.current[playingId].pause();
      }
      
      // Play the new audio
      if (audioRefs.current[id]) {
        audioRefs.current[id].currentTime = 0;
        audioRefs.current[id].play();
        setPlayingId(id);
      }
    }
  };

  // Stop playing when dropdown closes
  React.useEffect(() => {
    if (!isOpen && playingId) {
      audioRefs.current[playingId]?.pause();
      setPlayingId(null);
    }
  }, [isOpen, playingId]);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          className={cn(
            "w-full flex items-center justify-between rounded-lg border bg-secondary/50 px-4 py-3 text-sm hover:bg-secondary transition-colors",
            className
          )}
        >
          <span className="font-medium">{selectedOption?.name || label}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverPrimitive.Trigger>
      
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          className="z-50 w-[--radix-popover-trigger-width] rounded-lg border bg-card shadow-md"
          sideOffset={4}
        >
          <div className="p-1">
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "relative flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer",
                  value === option.id && "bg-accent",
                  option.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => {
                  if (!option.disabled) {
                    onChange(option.id);
                    setIsOpen(false);
                  }
                }}
              >
                {option.audioUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!option.disabled) {
                        handlePlay(option.id, option.audioUrl);
                      }
                    }}
                    className={cn(
                      "h-8 w-8 rounded-full bg-secondary flex items-center justify-center",
                      option.disabled && "cursor-not-allowed"
                    )}
                    disabled={option.disabled}
                  >
                    {playingId === option.id ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                )}
                
                <div className="flex flex-col flex-1">
                  <span className="font-medium">{option.name}</span>
                  {option.description && (
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                </div>

                {value === option.id && (
                  <Check className="h-4 w-4 text-primary" />
                )}

                {option.audioUrl && (
                  <audio
                    ref={(ref) => {
                      if (ref) audioRefs.current[option.id] = ref;
                    }}
                    src={option.audioUrl}
                    preload="none"
                  />
                )}
              </div>
            ))}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}