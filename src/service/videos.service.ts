import { axiosInstance } from "./axios";

// get all videos
export const getAllVideos = () => {
  return axiosInstance.get("/VideoPosts");
};

// create a new video post
export const createVideoPost = (data) => {
  const params = {
    Title: data.title,
    Description: data.description,
    Genre: data.genre,
    AgeRating: data.AgeRating,
    VideoYear: data.VideoYear,
    VideoFile: data.VideoFile,
    Tags: data.Tags,
  };
  return axiosInstance.post("/VideosPosts", params);
};

// get video by id
export const getVideoByID = (id) => {
  return axiosInstance.get(`/VideoPosts/${id}`);
};

// delete video by id
export const deleteVideoByID = (id) => {
  return axiosInstance.delete(`/VideoPosts/${id}`);
};

// get my videos (creator role only)
export const getMyVideos = () => {
  return axiosInstance.get(`/VideoPosts/me`);
};
