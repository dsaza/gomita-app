import { create } from "zustand";

interface Store {
  isAuthenticated: boolean;
}

export const useAuthStore = create<Store>((set) => ({
  isAuthenticated: false,
}));