import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/', // Update this if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔒 Add Authorization Header for Authenticated Requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the JWT token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
