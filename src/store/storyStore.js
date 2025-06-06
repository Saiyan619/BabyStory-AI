import { create } from "zustand";
const useStoryStore = create((set) => ({
    pastStories: [],
    setPastStories:(pastStories)=>set({pastStories})
}))
export default useStoryStore
