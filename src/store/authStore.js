import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      name: "auth-storage", // stored in localStorage
    }
  )
);
