import RemotionVideo from "@/app/dashboard/result/[id]/components/RemotionVideo";
import React from "react";
import { Composition } from "remotion";

export default function RemotionRoot() {
  return (
    <>
      <Composition
        id="Empty"
        component={RemotionVideo}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
}
