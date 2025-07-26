import {
  CreateComment,
  createComment,
  deleteComment,
  getComments,
} from "@/service/comments.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateComments = (videoId: string, username: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content }: CreateComment) =>
      createComment({ content, videoId }),

    onMutate: async (newComment) => {
      await queryClient.cancelQueries(["get-comments", videoId]);

      const previousComments = queryClient.getQueryData([
        "get-comments",
        videoId,
      ]);

      // Safely update cache optimistically
      queryClient.setQueryData(["get-comments", videoId], (old: any) => {
        const oldComments = Array.isArray(old) ? old : [];

        return [
          ...oldComments,
          {
            id: "temp-id-" + Date.now(), // Temporary ID
            content: newComment.content,
            videoId,
            userName: username, // Temporary placeholder
            userProfileId: username,
            createdAt: new Date().toISOString(),
          },
        ];
      });

      // Return context for rollback
      return previousComments;
    },

    onError: (error, _newComment, context) => {
      toast.error("Error Sending Comment, Please try again.");
      console.log(error);

      // Rollback if it fails
      if (context) {
        queryClient.setQueryData(["get-comments", videoId], context);
      }
    },

    onSuccess: () => {
      toast.success("Comment Sent 😉");

      // Optionally refetch to get fresh data
      queryClient.invalidateQueries(["get-comments", videoId]);
    },
  });
};

export const useGetComments = (id, options) => {
  return useQuery({
    queryKey: ["get-comments", id],
    queryFn: async () => {
      const response = await getComments({ id });
      // console.log(response)
      return response;
    },
    ...options,
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteComment({ id }),
    onSuccess: (response) => {
      toast.success("Comment Deleted😒");
      console.log(response.data);
      return response.data;
    },
    onError: (error) => {
      toast.error("Error Deleting Comment, Please try again.");
      console.log(error);
    },
  });
};
