"use client";
import { useEffect } from "react";
import { useGetAllVideos } from "@/queries/video.queries";
import VideoFeedSkeleton from "@/components/VideoFeedSkeleton";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useAllVideos } from "@/hooks/useAllVideos";
import { toast } from "sonner";

export default function HTML5VideoFeed() {
  const { AllVideos } = useAllVideos();

  useEffect(() => {
    toast.info("Video muted? ", {
      description: "Click the Unmute button at the bottom of the Screen😉",
    });
  }, []);

  if (AllVideos.isPending) return <VideoFeedSkeleton />;

  return <VideoPlayer AllVideos={AllVideos} />;
}
