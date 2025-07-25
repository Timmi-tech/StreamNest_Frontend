import { axiosInstance } from "./axios";

// create likes
export const likeVideo = (id) => {
  const params = {
    videoId: id,
  };
  return axiosInstance.post("/likes", params);
};

// get likes
export const getLikes = async ({ id }: { id: string }) => {
  const response = await axiosInstance.get(`/likes/${id}`);
  return response.data;
};
