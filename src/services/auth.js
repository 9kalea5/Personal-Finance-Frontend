import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Registration failed' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, credentials);
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Login failed' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/password-reset/`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Password reset request failed' };
  }
};
