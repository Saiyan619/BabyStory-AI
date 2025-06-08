import { create } from "zustand";

//This store contains my Settings State
export const useSettingsStore = create((set) => ({
  settings: null,
  setSettings: (settings) => set({ settings }),
}));
