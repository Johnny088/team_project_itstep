import type { User } from '../types';
import { api } from './api';

export const signIn = async () => {
  const { data } = await api.get<User>('auth/login/');
  console.log(data); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp
  return data;
};

export const signUp = async (userData: User) => {
  const { data } = await api.post('auth/register/', userData);
  console.log(data); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp
  return data;
};

export const refreshUserData = async () => {
  const { data } = await api.get('auth/refresh/');
  console.log(data); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp
  return data;
};

export const logout = () => api.post('auth/logout/');
