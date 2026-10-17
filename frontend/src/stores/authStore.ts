import { create } from 'zustand';
import type { User } from '../types';

interface AuthStore {
  isAuth: boolean;
  user: User | null;
  setUser: (data: User) => void;
  refresh: string | null;
  setRefresh: (data: string) => void;
  access: string | null;
  setAccess: (data: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuth: false,
  user: null,
  setUser: (user) => set({ user, isAuth: true }),
  refresh: null,
  setRefresh: (data) => set({ refresh: data }),
  access: null,
  setAccess: (data) => set({ access: data }),
  clearAuth: () =>
    set({ isAuth: false, user: null, refresh: null, access: null }),
}));

export const selectIsAuth = (state: AuthStore) => state.isAuth;
export const selectUser = (state: AuthStore) => state.user;
export const selectSetUser = (state: AuthStore) => state.setUser;
export const selectRefresh = (state: AuthStore) => state.refresh;
export const selectAccess = (state: AuthStore) => state.access;
export const selectSetAccess = (state: AuthStore) => state.setAccess;
export const selectClearAuth = (state: AuthStore) => state.clearAuth;
