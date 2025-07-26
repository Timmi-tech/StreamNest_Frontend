import { axiosInstance } from "./axios";

export interface CreateComment {
  content?: string;
  videoId?: string;
}

// create comment
export const createComment = (params: CreateComment) => {
  console.log(params);
  return axiosInstance.post("/comments", params);
};

// get comments
export const getComments = async ({ id }: { id: string }) => {
  const response = await axiosInstance.get(`/comments/${id}`);
  // console.log(response.data);
  return response.data;
};

// delete comment
export const deleteComment = async ({ id }: { id: string }) => {
  const response = await axiosInstance.delete(`/comments/${id}`);
  return response.data;
};
