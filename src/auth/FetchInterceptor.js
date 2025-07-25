import axios from 'axios';
import { API_BASE_URL } from '../configs/AppConfig';
import { signOutSuccess } from '../store/slices/authSlice';
import store from '../store';
import { AUTH_TOKEN, TOKEN_PAYLOAD_KEY, REQUEST_TIMEOUT } from '../constants/AuthConstant';

const unauthorizedCode = [400, 401, 403];

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT
});

service.interceptors.request.use(config => {
  const jwtToken = localStorage.getItem(AUTH_TOKEN) || null;
  if (jwtToken) {
    config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

service.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  if (unauthorizedCode.includes(error.response?.status)) {
    localStorage.removeItem(AUTH_TOKEN);
    store.dispatch(signOutSuccess());  // 🔹 Acción síncrona para limpiar estado
  }
  return Promise.reject(error);
});

export default service;
