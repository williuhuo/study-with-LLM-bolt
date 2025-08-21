import api from './api';

export const authService = {
  async login(email, password) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Get user data after successful login
    const userResponse = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });
    
    return {
      access_token: response.data.access_token,
      user: userResponse.data,
    };
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async updateProfile(userData) {
    const response = await api.put('/users/me', userData);
    return response.data;
  },
};