"use server";

import AWS from "aws-sdk";
import { getSignedURL } from "./urlSigned";
import { GenerateCaptions } from "./generateCaption";

export const GenerateVoice = async (videoData: any) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  // geenerate audio from story using AWS Polly
  const polly = new AWS.Polly({
    signatureVersion: "v4",
    region: "us-east-1",
  });

  const params = {
    OutputFormat: "mp3",
    Text: videoData.script,
    TextType: "text",
    VoiceId: videoData.voice,
    Engine: "standard",
  };

  try {
    const dataFile = await polly.synthesizeSpeech(params).promise();
    const audioStream = dataFile.AudioStream as Buffer;

    const signedUrl = await getSignedURL();

    if (signedUrl.signedUrl === undefined) {
      console.log(signedUrl.error);
      return { error: "Error Generating Voice" };
    }

    const url = signedUrl.signedUrl;
    const fileName = signedUrl.mediaUrl;

    await fetch(url, {
      method: "PUT",
      body: audioStream,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to upload voice: ${response.statusText}`);
        }
        console.log("Voice uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading voice:", error);
      });

    const transcribe = await GenerateCaptions(fileName);
    const captions = transcribe.transcribe?.words;

    return { captions, fileName };
  } catch (error) {
    console.log(error);
    return { error: "Error Generating Voice" };
  }
};
