import { useAuthStore } from '../stores/authStore';
import type { AuthDataType, User } from '../types';
import { api } from './api';

interface LoginResponce {
  access: string;
  refresh: string;
}

export const getUser = async () => {
  const { data } = await api.get<User>('/api/auth/me/');
  useAuthStore.getState().setUser(data);
  console.log(data);

  return data;
};

export const signIn = async (userData: AuthDataType) => {
  const payload = {
    username: userData.usernameOrEmail,
    password: userData.password,
  };
  const { data } = await api.post<LoginResponce>('/api/auth/login/', payload);
  useAuthStore.getState().setAccess(data.access);
  useAuthStore.getState().setRefresh(data.refresh);
  console.log(data); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp
  getUser();
};

export const signUp = async (userData: AuthDataType) => {
  const { data } = await api.post<User>('/api/auth/register/', userData);
  console.log(data); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp
  return data;
};

export const refreshUserData = async () => {
  const { data } = await api.get('auth/refresh/');
  console.log(data); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp
  return data;
};

export const logout = async () => {
  api.post('/api/auth/logout/');
  const refresh: string | null = useAuthStore.getState().refresh;

  if (!refresh) {
    useAuthStore.getState().clearAuth();
    return;
  }

  try {
    await api.post('/api/auth/logout/', { refresh });
  } catch (error) {
    console.error('Logout failed on server:', error);
  } finally {
    useAuthStore.getState().clearAuth();
  }
};
