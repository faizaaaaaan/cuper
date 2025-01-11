"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Wand2, AlertCircle, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface VideoSegment {
  id: number;
  timeRange: string;
  content: string;
  wordCount: number;
  placeholder: string;
}

const DEMO_SCRIPT = [
  {
    id: 1,
    timeRange: "Opening Hook (0-10s)",
    content: "Have you ever wondered what makes rainbows appear in the sky?",
    wordCount: 11,
    placeholder: "Start with an engaging question or statement that hooks your audience"
  },
  {
    id: 2,
    timeRange: "Key Point 1 (10-20s)",
    content: "Believe it or not, every rainbow you see is your own personal light show! That's right – each person sees a slightly different rainbow because it depends on where you're standing.",
    wordCount: 24,
    placeholder: "Introduce your first main point with an interesting fact"
  },
  {
    id: 3,
    timeRange: "Key Point 2 (20-30s)",
    content: "What's really mind-blowing is that rainbows are actually full circles – we just can't usually see the bottom half because the Earth gets in the way.",
    wordCount: 25,
    placeholder: "Build on your previous point with supporting information"
  },
  {
    id: 4,
    timeRange: "Supporting Detail (30-40s)",
    content: "Pilots and skydivers sometimes get to see these rare circular rainbows!",
    wordCount: 12,
    placeholder: "Add an engaging example or illustration"
  },
  {
    id: 5,
    timeRange: "Key Point 3 (40-50s)",
    content: "And here's something amazing: there's always a second rainbow above the main one, but it's fainter and shows the colors in reverse order.",
    wordCount: 23,
    placeholder: "Present your final key point with impact"
  },
  {
    id: 6,
    timeRange: "Call to Action (50-60s)",
    content: "Next time you see a rainbow, look carefully – can you spot its shy twin? What other secret light shows might be happening right before your eyes?",
    wordCount: 25,
    placeholder: "End with a thought-provoking question or call to action"
  }
];

export default function ScriptEditorPage() {
  const router = useRouter();
  const [segments, setSegments] = useState<VideoSegment[]>(DEMO_SCRIPT);
  const [activeSegment, setActiveSegment] = useState<number>(1);

  const handleContentChange = (id: number, newContent: string) => {
    setSegments(segments.map(segment => {
      if (segment.id === id) {
        const wordCount = newContent.trim().split(/\s+/).length;
        return { ...segment, content: newContent, wordCount };
      }
      return segment;
    }));
  };

  const getTotalWordCount = () => {
    return segments.reduce((total, segment) => total + segment.wordCount, 0);
  };

  const isOverWordLimit = (segmentWordCount: number) => segmentWordCount > 25;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-1">Edit Video Script</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Craft your video script segment by segment
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => router.back()}
              className="text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button 
              className="bg-black hover:bg-black/90 text-sm"
              onClick={() => router.push("/dashboard/preview")}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Video
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6 lg:gap-8">
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl border">
              <div className="flex items-center gap-2 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Script Progress
              </div>
              <div className="flex overflow-x-auto lg:block lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                <div className="flex lg:block w-full gap-2 lg:gap-0 lg:space-y-2">
                  {segments.map((segment) => (
                    <button
                      key={segment.id}
                      onClick={() => setActiveSegment(segment.id)}
                      className={cn(
                        "flex-shrink-0 lg:w-full text-left p-3 rounded-lg transition-colors text-sm whitespace-nowrap",
                        activeSegment === segment.id
                          ? "bg-black text-white"
                          : "hover:bg-[#f7f7f7] text-muted-foreground",
                        segment.content ? "font-medium" : "italic"
                      )}
                    >
                      {segment.timeRange}
                      {segment.wordCount > 0 && (
                        <div className={cn(
                          "text-xs mt-1",
                          isOverWordLimit(segment.wordCount) ? "text-red-400" : "text-gray-400"
                        )}>
                          {segment.wordCount}/25 words
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Total words: {getTotalWordCount()}/150
              </AlertDescription>
            </Alert>
          </div>

          <div className="bg-white rounded-xl border p-4 sm:p-6">
            {segments.map((segment) => (
              <div
                key={segment.id}
                className={cn(
                  "space-y-4",
                  activeSegment === segment.id ? "block" : "hidden"
                )}
              >
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">{segment.timeRange}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {segment.placeholder}
                  </p>
                </div>

                <Textarea
                  value={segment.content}
                  onChange={(e) => handleContentChange(segment.id, e.target.value)}
                  className={cn(
                    "min-h-[200px] sm:min-h-[300px] text-base sm:text-lg leading-relaxed bg-[#f7f7f7] border-0",
                    isOverWordLimit(segment.wordCount) && "border-red-500"
                  )}
                  placeholder="Write your script for this segment..."
                />

                {isOverWordLimit(segment.wordCount) && (
                  <p className="text-sm text-red-500">
                    This segment exceeds the recommended 25-word limit
                  </p>
                )}

                <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveSegment(Math.max(1, segment.id - 1))}
                    disabled={segment.id === 1}
                    className="w-full sm:w-auto order-2 sm:order-1"
                  >
                    Previous Segment
                  </Button>
                  <Button
                    onClick={() => setActiveSegment(Math.min(segments.length, segment.id + 1))}
                    disabled={segment.id === segments.length}
                    className="bg-black hover:bg-black/90 w-full sm:w-auto order-1 sm:order-2"
                  >
                    Next Segment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}