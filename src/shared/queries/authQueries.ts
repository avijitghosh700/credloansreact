import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchUserProfile,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from '../services/auth.api';
import useAuthStore from '../store/authSlice';

const { setToken } = useAuthStore.getState();

export const useLogin = (onSuccessHandler?: () => void) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.accessToken) {
        setToken(data.accessToken);

        if (onSuccessHandler) {
          onSuccessHandler();
        }
      }
    },
  });
};

export const useRegister = (onSuccessHandler?: () => void) => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data?.accessToken) {
        setToken(data.accessToken);

        if (onSuccessHandler) {
          onSuccessHandler();
        }
      }
    },
  });
};

export const useForgotPassword = (onSuccessHandler?: () => void) => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      if (onSuccessHandler) {
        onSuccessHandler();
      }
    },
  });
};

export const useResetPassword = (onSuccessHandler?: () => void) => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      if (onSuccessHandler) {
        onSuccessHandler();
      }
    },
  });
};

export const useLogout = (onSuccessHandler?: () => void) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      if (onSuccessHandler) {
        onSuccessHandler();
      }
    },
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });
};
