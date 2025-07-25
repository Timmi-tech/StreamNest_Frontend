import {
  createComment,
  deleteComment,
  getComments,
} from "@/service/comments.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateComments = () => {
  return useMutation({
    mutationFn: (data) => createComment(data),
    onSuccess: (response) => {
      toast.success("Comment Sent😉");
      console.log(response.data);
      return response.data;
    },
    onError: (error) => {
      toast.error("Error Sending Comment, Please try again.");
      console.log(error);
    },
  });
};

export const useGetComments = (id, options) => {
  return useQuery({
    queryKey: ["get-comments", id],
    queryFn: async () => {
      const response = await getComments({ id });
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
