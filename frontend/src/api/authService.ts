import type { AuthDataType, User } from '../types';
import { api } from './api';

export const signIn = async (userData: AuthDataType) => {
  const payload = {
    username: userData.usernameOrEmail,
    password: userData.password,
  };
  const { data } = await api.post<User>('/api/auth/login/', payload);
  console.log(data); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< temp

  return data;
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

export const logout = () => api.post('auth/logout/');
