import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/api', // Adjust the URL to match your backend
});

export default api;
