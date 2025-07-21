import { axiosInstance } from "./axios";

export const login = async (data) => {
  return await axiosInstance.post("/authentication/login", data);
};

export const signUp = async (data) => {
  return await axiosInstance.post("/authentication/register", data);
};
