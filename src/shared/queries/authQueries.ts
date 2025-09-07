import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchUserProfile,
  forgotPassword,
  login,
  register,
  resetPassword,
} from '../services/auth.api';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.token) {
        sessionStorage.setItem('token', data.token);
      }
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data?.token) {
        sessionStorage.setItem('token', data.token);
      }
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

export const useFetchUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });
};
