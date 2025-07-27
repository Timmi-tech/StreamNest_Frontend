import { SearchVideo } from "@/service/searchVideos.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSearch = (data, options) => {
  return useQuery({
    queryKey: ["search-videos", data],
    queryFn: async () => {
      const response = await SearchVideo(data);
      console.log(response.data);
      return response.data;
    },
    ...options,
  });
};
