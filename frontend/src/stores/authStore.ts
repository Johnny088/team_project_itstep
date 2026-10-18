import { create } from 'zustand';
import type { User } from '../types';

interface AuthStore {
  isAuth: boolean;
  user: User | null;
  setUser: (data: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuth: false,
  user: null,
  setUser: (user) => set({ user, isAuth: true }),

  clearAuth: () => set({ isAuth: false, user: null }),
}));

export const selectIsAuth = (state: AuthStore) => state.isAuth;
export const selectUser = (state: AuthStore) => state.user;
export const selectSetUser = (state: AuthStore) => state.setUser;
export const selectClearAuth = (state: AuthStore) => state.clearAuth;
