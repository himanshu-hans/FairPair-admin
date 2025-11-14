import axios from 'axios';
import { API_BASE_URL } from './apiUrl';
import store from '../../components/authRedux/store';
import { logout } from '../../components/authRedux/authSlice';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token from Redux store
axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth?.access_token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';
  }
  
  return config;
});

// Response interceptor - Auto-logout on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response && response.status === 401) {
      store.dispatch(logout());
      window.location.replace('/');
    }
    
    return Promise.reject(error);
  }
);

// Common HTTP methods - Simple and works for everything
export const get = (url, config = {}) => axiosInstance.get(url, config);
export const post = (url, data, config = {}) => axiosInstance.post(url, data, config);
export const put = (url, data, config = {}) => axiosInstance.put(url, data, config);
export const patch = (url, data, config = {}) => axiosInstance.patch(url, data, config);
export const del = (url, config = {}) => axiosInstance.delete(url, config);

export default axiosInstance;