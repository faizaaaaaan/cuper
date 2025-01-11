"use server";

import { db } from "@/server/db";
import { currentUser } from "@/server/user";

interface Caption {
  text: string;
  start: number;
  end: number;
  confidence: number;
  speaker: string | null;
}

interface VideoData {
  title: string;
  script: string;
  voice: string;
  background: string;
  music?: string;
  audioUrl: string;
  captions: Caption[];
}

export default async function SaveVideoData(data: VideoData) {
  const userid = await currentUser();
  const id = userid?.id;

  console.log(data);

  if (!id) {
    return { error: "You must be logged in to save video data" };
  }

  try {
    // Create the video entry with its captions in a single transaction
    const savedVideo = await db.generated.create({
      data: {
        title: data.title,
        script: data.script,
        voice: data.voice,
        background: data.background,
        music: data.music || "none",
        audioUrl: data.audioUrl,
        userId: id,
        captions: {
          create: data.captions.map((caption) => ({
            text: caption.text,
            start: caption.start,
            end: caption.end,
            confidence: caption.confidence,
            speaker: caption.speaker || "", // Convert null to empty string
          })),
        },
      },
      include: {
        captions: true,
      },
    });

    return { savedVideo };
  } catch (error) {
    console.error("Error saving video data:", error);
    return { error: "Failed to save video data" };
  }
}
