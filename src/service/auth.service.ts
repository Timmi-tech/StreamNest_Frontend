import axios from "axios";
import { axiosInstance } from "./axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUser,
  useAuthStore,
} from "@/store/AuthStore";
import Cookies from "js-cookie";

export const login = async (data) => {
  try {
    const response = await axiosInstance.post("/authentication/login", data);
    const { accessToken, refreshToken } = response.data;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    const userProfile = await getUserProfile();
    useAuthStore.getState().setUser(userProfile.data);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // re-throw so caller can catch it
  }
};

export const refreshAccessToken = async () => {
  // get access token from store
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token found");
  const response = await axiosInstance.post("/authentication/refresh", {
    refreshToken,
  });
  const { accessToken, refreshToken: newRefreshToken } = response.data;

  //  store the new tokens in localStorage or cookies
  Cookies.set("accessToken", accessToken);
  setAccessToken(accessToken);
  setRefreshToken(newRefreshToken);
  return accessToken;
};

export const logout = async () => {
  // clear tokens from localStorage or cookies
  await axiosInstance.post("/authentication/logout");
  // clear token on store
  clearTokens();
};
export const getUserProfile = async () => {
  return await axiosInstance.get("/UserProfile");
};
export const signUp = async (data) => {
  return await axiosInstance.post("/authentication/register", data);
};
