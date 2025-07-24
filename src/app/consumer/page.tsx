"use client";
import { useEffect } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import VideoFeedSkeleton from "@/components/VideoFeedSkeleton";
import { useGetAllVideos } from "@/queries/video.queries";

export default function HTML5VideoFeed() {
  const AllVideos = useGetAllVideos();

  useEffect(() => {
    if (AllVideos.isSuccess) {
      console.log(AllVideos);
      console.log(AllVideos.data?.length);
    }
  }, [AllVideos.isSuccess]);

  useEffect(() => {
    AllVideos.isError && console.log(AllVideos.error);
  }, [AllVideos.isError]);

  useEffect(() => {
    AllVideos.isPending && console.log("loading");
  }, [AllVideos.isPending]);

  if (AllVideos.isPending) return <VideoFeedSkeleton />;

  return <VideoPlayer AllVideos={AllVideos} />;
}
