import { create } from "zustand";
import { persist } from "zustand/middleware";

//This is my Zustand Store for my authentiction
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      userLoading: true,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setUserLoading: (loading) => set({ userLoading: loading }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // stored in localStorage (making use of the "persist")
    }
  )
);
