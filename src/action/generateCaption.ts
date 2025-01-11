"use server";

import { auth } from "@/server/auth";
import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_KEY as string,
});

export const GenerateCaptions = async (fileUrl: string) => {
  const session = await auth();
  if (!session) {
    return { error: "Not authenticated" };
  }

  try {
    const data = {
      audio: fileUrl,
    };

    const transcribe = await client.transcripts.transcribe(data);

    return { transcribe };
  } catch (error) {
    console.log(error);
    return { error: "Error Uploading Voice" };
  }
};
