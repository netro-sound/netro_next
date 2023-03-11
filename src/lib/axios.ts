import axios from 'axios';
import * as process from 'process';
import { useAuthStore } from '@/stores/useAuthStore';
// import { useAuthStore } from '@/store/auth';
// import { toastWarning } from '@/utils/toasts';

const apiAxios = axios.create({
  baseURL: '/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/auth',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiAxios.interceptors.request.use((config) => {
  // if url do not end with / adds / to the end
  if (!config.url?.endsWith('/')) {
    config.url += '/';
  }

  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

apiAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response.status === 401) {
    //   useAuthStore.getState().logout();
    // }

    // if (error.response.status === 403) {
    //   toastWarning('Você não tem permissão para acessar essa informação.');
    // }

    return Promise.reject(error);
  }
);

export { apiAxios, authAxios };
