import { create } from "zustand";

// this store set and get the video id when the sue wants to make a comment
interface CommentState {
  videoId: string | null;
  setVideoId: (videoId: string) => void;
}

export const useCommentStore = create<CommentState>()((set, get) => ({
  videoId: null,
  setVideoId: (id) => {
    set({ videoId: id });
  },
}));

export const setVideoId = (id: string) => {
  useCommentStore.getState().setVideoId(id);
};
export const getVideoId = () => useCommentStore().videoId;
