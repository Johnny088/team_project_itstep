import axios, { type AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true,
});

let refreshPromise: null | Promise<AxiosResponse<string>> = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;

    if (originalRequest.url.includes('/api/auth/refresh/')) {
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = api
        .post<string>('/api/auth/refresh/')
        .finally(() => (refreshPromise = null));
    }

    try {
      await refreshPromise;
      return api(originalRequest);
    } catch (error) {
      // window.location.href = '/';
      return Promise.reject(error);
    }
  }
);
