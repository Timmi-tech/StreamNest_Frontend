import { getLikes, likeVideo } from "@/service/like.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLikeVideo = (data) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => likeVideo(data),
    onMutate: async () => {
      await queryClient.cancelQueries(["get-likes", data]);

      const previousData = queryClient.getQueryData(["get-likes", data]);

      queryClient.setQueryData(["get-likes", data], (old: any) => {
        if (!old) return old;

        const isLiked = !old.isLiked;
        const totalLikes = isLiked ? old.totalLikes + 1 : old.totalLikes - 1;

        return { ...old, isLiked, totalLikes };
      });

      return { previousData };
    },
    onSuccess: (response) => {
      //   toast.success("Liked❤💕");
      console.log(response.data);
      return response.data;
    },
    onError: (error, _vars, context) => {
      queryClient.setQueryData(["get-likes", data], context?.previousData);
      toast.error("That did'nt work🤔");
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["get-likes", data]);
    },
  });
};

export const useGetLikes = (id) => {
  return useQuery({
    queryKey: ["get-likes", id],
    queryFn: async () => {
      const response = await getLikes({ id });
      return response;
    },
  });
};
