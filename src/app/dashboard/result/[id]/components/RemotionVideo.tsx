import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";

export default function RemotionVideo({
  audioUrl,
  background,
  music,
  captions = [],
  setDurationInFrames,
}: any) {
  const config = useVideoConfig();
  const frame = useCurrentFrame();

  useEffect(() => {
    if (captions && captions.length > 0) {
      const duration = Math.ceil(
        (captions[captions.length - 1].end / 1000) * config.fps
      );
      setDurationInFrames(duration);
    }
  }, [captions, config.fps, setDurationInFrames]);

  const getCurrentCaption = () => {
    const currentTime = (frame / config.fps) * 1000;
    return (
      captions.find(
        (caption: any) =>
          caption.start <= currentTime && caption.end >= currentTime
      )?.text || ""
    );
  };

  const getBGMusic = (name: string) => {
    return `https://creatrreel-india-awss3-audios.s3.eu-north-1.amazonaws.com/bg-music/${name}.mp3`;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {/* Background Video */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Video
          src={background}
          muted
          style={{ width: "100%", height: "100%" }}
        />
      </AbsoluteFill>

      {/* Captions */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="px-5 w-full text-center">
          {getCurrentCaption() && (
            <p
              className="text-white text-2xl font-bold m-0 leading-relaxed"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
            >
              {getCurrentCaption()}
            </p>
          )}
        </div>
      </AbsoluteFill>

      {/* Audio Tracks */}
      <Audio src={audioUrl} />
      {music !== "none" && <Audio loop src={getBGMusic(music)} volume={0.5} />}
    </AbsoluteFill>
  );
}
