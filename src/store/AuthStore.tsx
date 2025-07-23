import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { access } from "fs";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
  clearTokens: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: User) => {
        set({ user });
        Cookies.set("user-role", user.role);
        set({ isAuthenticated: !!user });
      },
      accessToken: null,
      refreshToken: Cookies.get("refreshToken") || null,
      setAccessToken: (accessToken: string) => {
        Cookies.set("accessToken", accessToken, {
          path: "/",
          expires: 7, // Set cookie to expire in 7 days
          secure: true, // Use secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
        });
        set({ accessToken: accessToken });
      },
      setRefreshToken: (refreshToken: string) => {
        Cookies.set("refreshToken", refreshToken, {
          path: "/",
          expires: 7, // Set cookie to expire in 7 days
          secure: true, // Use secure cookies in production
          sameSite: "Strict", // Prevent CSRF attacks
        });
        set({ refreshToken });
      },
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      clearTokens: () => {
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        Cookies.remove("user-role");
        set({ refreshToken: null, accessToken: null });
      },
      logout: () => {
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        Cookies.remove("user-role");
        window.location.href = "/auth/login";
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export const getAccessToken = () => useAuthStore().accessToken;
export const getRefreshToken = () => useAuthStore().refreshToken;
export const setAccessToken = useAuthStore.getState().setAccessToken;
export const setRefreshToken = useAuthStore.getState().setRefreshToken;
export const clearTokens = useAuthStore.getState().clearTokens;
export const setUser = useAuthStore.getState().setUser;
export const getUser = () => useAuthStore().user;
export const isAuthenticated = () => useAuthStore().isAuthenticated;
export const LogUserOut = useAuthStore.getState().logout;
