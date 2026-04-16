import axios from 'axios';

const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL: isServer ? process.env.INTERNAL_API_URL || 'http://localhost:3000/api' : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
