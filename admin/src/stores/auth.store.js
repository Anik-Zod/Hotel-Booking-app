import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  loginStart: () => set({ loading: true, error: null }),

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user, loading: false, error: null });
  },

  loginFailure: (error) => set({ error, loading: false }),

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, loading: false, error: null });
  },
}));
