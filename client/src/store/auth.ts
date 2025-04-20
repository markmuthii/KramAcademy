import { logout } from "@/services/auth";
import { AuthData, User } from "@/types";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  authError: string | null;
  setUser: (user: User) => void;
  logout: () => Promise<AuthData | { error: string }>;
  setAuthError: (error: string) => void;
  clearAuthError: () => void;
}

export const useAuth = create<UserStore>((set) => ({
  user: null,
  authError: null,
  setUser: (user: any) => set({ user }),
  logout: async () => {
    // Clear user from store after logout
    set({ user: null });

    return await logout();
  },
  setAuthError: (error: string) => set({ authError: error }),
  clearAuthError: () => set({ authError: null }),
}));
