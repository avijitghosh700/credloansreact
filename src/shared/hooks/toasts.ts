import toast from 'react-hot-toast';

export const useToasts = () => {
  const successToast = (message: string) => {
    toast.success(message);
  };

  const errorToast = (message: string) => {
    toast.error(message);
  };

  const loadingToast = (message: string) => {
    toast.loading(message);
  };

  return { successToast, errorToast, loadingToast };
};
