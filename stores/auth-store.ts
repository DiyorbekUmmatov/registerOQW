"use client";

import {
  Session,
  clearSession,
  getSession,
  setSession as writeSession,
} from "@/lib/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  session: Session | null;
  hydrated: boolean;
  setSession: (session: Session | null) => void;
  hydrate: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      hydrated: false,
      setSession: (session) => {
        if (session) {
          writeSession(session);
        } else {
          clearSession();
        }
        set({ session });
      },
      hydrate: () => {
        const session = getSession();
        set({ session, hydrated: true });
      },
      logout: () => {
        clearSession();
        set({ session: null });
      },
    }),
    {
      name: "session",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ session: state.session }),
    }
  )
);
