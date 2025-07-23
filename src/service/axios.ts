import {
  clearTokens,
  getAccessToken,
  LogUserOut,
  setAccessToken,
} from "@/store/AuthStore";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: "https://streamnest-880k.onrender.com/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = Cookies.get("accessToken");
        const RefreshToken = Cookies.get("refreshToken");
        const res = await axios.post(
          "https://streamnest-880k.onrender.com/api/token/refresh",
          {
            accessToken: token,
            refreshToken: RefreshToken,
          }
        );
        const { accessToken } = res.data;

        setAccessToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        clearTokens();
        LogUserOut();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

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
