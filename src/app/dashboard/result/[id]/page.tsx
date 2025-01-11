import { getVideoById } from "@/server/user";
import React from "react";
import { notFound } from "next/navigation";
import PlayerComponent from "./components/Player";

type Props = {
  params: { id: string };
};

export default async function page({ params }: Props) {
  const video = await getVideoById(params.id);

  if (!video) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-4 py-12">
        <PlayerComponent video={video} />
      </main>
    </div>
  );
}
