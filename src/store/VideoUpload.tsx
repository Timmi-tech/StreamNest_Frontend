import { create } from "zustand";

interface VideoUploadState {
  uploadStatus: number;
  setUploadProgress: (percent: number) => void;
}

export const useVideoUploadStore = create<VideoUploadState>()((set) => ({
  uploadStatus: 0,
  setUploadProgress: (percent: number) => {
    set({ uploadStatus: percent });
  },
}));

export const getUploadStatus = () => useVideoUploadStore().uploadStatus;
export const setUploadProgress = (percent: number) => {
  useVideoUploadStore.getState().setUploadProgress(percent);
};
