"use server";

import { auth } from "@/server/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const getSignedURL = async () => {
  const session = await auth();
  if (!session) {
    return { error: "Not authenticated" };
  }

  try {
    const id = uniqid();
    const newName = `audios/${id}.mp3`;

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: "audio/mpeg",
      Key: newName,
    });

    const signedUrl = await getSignedUrl(s3, uploadCommand, {
      expiresIn: 60,
    });

    const mediaUrl = signedUrl.split("?")[0];

    return { signedUrl, mediaUrl, filename: id + "." };
  } catch (error) {
    console.log(error);
    return { error: "Error Uploading Voice" };
  }
};
