"use client";
import { useEffect } from "react";
import { useGetAllVideos } from "@/queries/video.queries";
import VideoFeedSkeleton from "@/components/VideoFeedSkeleton";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useAllVideos } from "@/hooks/useAllVideos";

export default function HTML5VideoFeed() {
  const { AllVideos } = useAllVideos();

  if (AllVideos.isPending) return <VideoFeedSkeleton />;

  return <VideoPlayer AllVideos={AllVideos} />;
}
