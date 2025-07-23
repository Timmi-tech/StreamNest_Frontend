import { login, signUp } from "@/service/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => login(data),
    onSuccess: (response) => {
      console.log("Login successful", response);
      return response.data;
    },
    onError: (error) => {
      return error.response.data.errors.Authentication;

      // throw error.response.data.errors;
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data) => signUp(data),
    onSuccess: (response) => {
      console.log("Sign up successful", response);
    },
    onError: (error) => {
      throw error;
    },
  });
};
