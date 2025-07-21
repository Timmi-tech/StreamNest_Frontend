import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://streamnest-880k.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // You can add any request interceptors here
//     return config;
//   },
//   (error: AxiosError) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );
