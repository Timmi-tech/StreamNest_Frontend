import { axiosInstance } from "./axios";

// get all videos
export const getAllVideos = async () => {
  const response = await axiosInstance.get("/VideoPosts");
  return response.data;
};

// create a new video post
export const createVideoPost = (data) => {
  const params = {
    Title: data.title,
    Description: data.description,
    Genre: data.genre,
    AgeRating: data.ageRating,
    VideoYear: data.videoYear,
    Tags: data.tags,
    VideoFile: data.videoFile,
  };
  console.log(params);

  try {
    const response = axiosInstance.post("/VideoPosts", params, {
      headers: { "Content-Type": "multipart/form-data" }, // optional — Axios usually sets this automatically
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Upload failed:", error);
  }
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
export const getMyVideos = async () => {
  const response = axiosInstance.get(`/VideoPosts/me`);
  return response;
};

// {
//       onUploadProgress: (progressEvent) => {
//         const percent = Math.round(
//           (progressEvent.loaded * 100) / progressEvent.total
//         );
//         setUploadProgress(percent); // update your progress state
//       },
//     }
