import { axiosInstance } from "./axios";

// create comment
export const createComment = (data) => {
  const params = {
    content: data.content,
    videoId: data.videoId,
  };
  return axiosInstance.post("/comments", params);
};

// get comments
export const getComments = async ({ id }: { id: string }) => {
  const response = await axiosInstance.get(`/comments/${id}`);
  console.log(response.data);
  return response.data;
};

// delete comment
export const deleteComment = async ({ id }: { id: string }) => {
  const response = await axiosInstance.delete(`/comments/${id}`);
  return response.data;
};
