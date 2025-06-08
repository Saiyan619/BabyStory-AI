import { create } from "zustand";
//This store contains my generated stories State
const useStoryStore = create((set) => ({
  pastStories: [],
  setPastStories: (pastStories) => set({ pastStories }),
}));
export default useStoryStore;
