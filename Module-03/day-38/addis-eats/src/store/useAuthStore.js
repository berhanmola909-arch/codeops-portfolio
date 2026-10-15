import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: ({ email, name }) =>
        set({
          user: { email, name: name || email.split("@")[0] },
          isAuthenticated: true,
        }),

      register: ({ email, name }) =>
        set({
          user: { email, name },
          isAuthenticated: true,
        }),

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "habesha-auth" }
  )
);