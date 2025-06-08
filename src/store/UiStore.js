import { create } from "zustand";
//This store contains my UI states (loader, error, success)
export const useUiStore = create((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: false,
  setError: (error) => set({ error }),
  success: false,
  setSuccess: (success) => set({ success }),
  message: "",
  setMessage: (message) => set({ message }),
}));
