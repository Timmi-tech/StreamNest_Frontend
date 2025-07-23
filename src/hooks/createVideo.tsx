import { axiosInstance } from "@/service/axios";
import { setUploadProgress } from "@/store/VideoUpload";

export const createVideoPost = async (data) => {
  const params = {
    Title: data.title,
    Description: data.description,
    Genre: data.genre,
    AgeRating: data.AgeRating,
    VideoYear: data.VideoYear,
    VideoFile: data.VideoFile,
    Tags: data.Tags,
  };
  try {
    const response = await axiosInstance.post("/VideosPosts", params);
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

// {
//       onUploadProgress: (progressEvent) => {
//         const percent = Math.round(
//           (progressEvent.loaded * 100) / progressEvent.total
//         );
//         setUploadProgress(percent); // update your progress state
//       },
//     });
