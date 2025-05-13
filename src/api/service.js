import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/',
  timeout: 100 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    // 添加认证 token 等
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default apiClient;