"use client";

import { create } from "zustand";
import { AuthUser } from "../types/auth";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;

  setUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      loading: false,
    }),

  fetchUser: async () => {
    try {
      set({ loading: true });

      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        set({ user: null, isAuthenticated: false, loading: false });
        return;
      }

      const data = await res.json();
      set({ user: data.user, isAuthenticated: true, loading: false });
    } catch {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  logout: async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    set({ user: null, isAuthenticated: false });
  },
}));
