import { useGetAllVideos } from "@/queries/video.queries";
import { useEffect } from "react";
import { toast } from "sonner";

export const useAllVideos = () => {
  const AllVideos = useGetAllVideos();

  useEffect(() => {
    if (AllVideos.isError) {
      console.log(AllVideos.error);
      toast.error("Error Loading videos😢", {
        description:
          "Please check your network and try again. Close this Message to try again",
        duration: AllVideos.isError ? Infinity : 10,
        onDismiss: AllVideos.refetch(),
      });
    }
  }, [AllVideos.isError]);

  useEffect(() => {
    AllVideos.isPending && console.log("loading");
  }, [AllVideos.isPending]);

  useEffect(() => {
    console.log("render");
  }, [AllVideos]);

  return { AllVideos };
};
