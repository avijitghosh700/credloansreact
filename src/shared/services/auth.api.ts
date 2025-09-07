import axiosInstance from './base.api';

export const login = async (credential: {
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post('/auth/login', credential);
  return data;
};

export const register = async (credential: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const { data } = await axiosInstance.post('/auth/register', credential);
  return data;
};

export const forgotPassword = async (email: string) => {
  const { data } = await axiosInstance.post('/auth/forgot-password', { email });
  return data;
};

export const resetPassword = async (payload: {
  email: string;
  newPassword: string;
}) => {
  const { data } = await axiosInstance.post('/auth/reset-password', payload);
  return data;
};

export const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};
