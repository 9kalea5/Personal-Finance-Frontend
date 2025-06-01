import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const transactionAPI = {
  getAll: (params) => api.get('/transactions/', { params }),
  create: (data) => api.post('/transactions/', data),
  update: (id, data) => api.put(`/transactions/${id}/`, data),
  delete: (id) => api.delete(`/transactions/${id}/`),
};

export const goalAPI = {
  getAll: () => api.get('/transactions/goals/'),
  create: (data) => api.post('/transactions/goals/', data),
  update: (id, data) => api.put(`/transactions/goals/${id}/`, data),
  delete: (id) => api.delete(`/transactions/goals/${id}/`),
};

export const walletAPI = {
  getAll: () => api.get('/transactions/wallets/'),
  create: (data) => api.post('/transactions/wallets/', data),
  update: (id, data) => api.put(`/transactions/wallets/${id}/`, data),
  delete: (id) => api.delete(`/transactions/wallets/${id}/`),
};

export const categoryAPI = {
  getAll: () => api.get('/transactions/categories/'),
  create: (data) => api.post('/transactions/categories/', data),
  update: (id, data) => api.put(`/transactions/categories/${id}/`, data),
  delete: (id) => api.delete(`/transactions/categories/${id}/`),
};

export const budgetAPI = {
  getAll: () => api.get('/transactions/budgets/'),
  create: (data) => api.post('/transactions/budgets/', data),
  update: (id, data) => api.put(`/transactions/budgets/${id}/`, data),
};

export default api;
