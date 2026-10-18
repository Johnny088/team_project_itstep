import { useAuthStore } from '../stores/authStore';
import type { AuthDataType, User } from '../types';
import { api } from './api';

export const getUser = async () => {
  const { data } = await api.get<User>('/api/auth/me/');
  if (!data) return;

  useAuthStore.getState().setUser(data);

  return data;
};

export const signIn = async (userData: AuthDataType) => {
  const payload = {
    username: userData.usernameOrEmail,
    password: userData.password,
  };
  const { data } = await api.post('/api/auth/login/', payload);
  useAuthStore.getState().setUser(data);
  console.log(data); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp
  getUser();
};

export const signUp = async (userData: AuthDataType) => {
  const result = await api.post<User>('/api/auth/register/', userData);
  console.log(result); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp
  return result;
};

export const refreshUserData = async () => {
  const { data } = await api.get('/api/auth/refresh/');
  console.log(data); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp
  return data;
};

export const logout = async () => {
  api.post('/api/auth/logout/');
  useAuthStore.getState().clearAuth();
  return;
};
