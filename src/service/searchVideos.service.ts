import { axiosInstance } from "./axios";

// Search fro videos
export const SearchVideo = async (data) => {
  console.log(data);
  const params = {
    query: data.query,
    genre: data.genre || "",
    year: data.year || "",
  };
  console.log(params);
  console.log(axiosInstance.getUri({ url: "VideoPosts/search", params }));
  return await axiosInstance.get("VideoPosts/search", { params });
};
