import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  useForgotPassword,
  useResetPassword,
} from '../../shared/queries/authQueries';
import { ArrowLeft, Eye, EyeOff, Loader } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useToasts } from '../../shared/hooks/toasts';

const forgotPasswordInitSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
});

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type forgotPasswordFormValues = z.infer<typeof forgotPasswordInitSchema>;
type resetFormValues = z.infer<typeof resetPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { successToast } = useToasts();

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [email, setEmail] = useState('');

  const {
    mutate: forgotPassword,
    isPending: isForgotPasswordPending,
    isSuccess: isForgotPasswordSuccess,
  } = useForgotPassword();
  const { mutate: resetPassword, isPending: isResetPasswordPending } =
    useResetPassword(() => {
      successToast('Password reset successful. Please login.');
      navigate('/auth/login');
    });

  const {
    reset: resetForgotPasswordForm,
    register: forgotPasswordRegister,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordErrors },
  } = useForm<forgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordInitSchema),
  });

  const {
    reset: resetRegisterForm,
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm<resetFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [isResetReady, setResetReady] = useState(false);

  const resetComponentState = () => {
    setResetReady(false);
    resetForgotPasswordForm();
    resetRegisterForm();
    setEmail('');
  };

  const onForgotPasswordSubmit = (data: forgotPasswordFormValues) => {
    if (!data) return;

    setEmail(data.email);
    forgotPassword(data.email);
  };

  const onResetSubmit = (data: resetFormValues) => {
    if (!data || !email) return;

    resetPassword({
      email,
      newPassword: data.newPassword,
    });
  };

  const forgotPasswordForm = (
    <>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Forgot password
      </h2>
      <form
        onSubmit={handleForgotPasswordSubmit(onForgotPasswordSubmit)}
        noValidate
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...forgotPasswordRegister('email')}
            className={`w-full px-3 py-2 border rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-600
            ${forgotPasswordErrors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your email"
            autoComplete="email"
          />
          {forgotPasswordErrors.email && (
            <span className="text-red-500 text-xs mt-1">
              {forgotPasswordErrors.email.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-950
          focus:outline-none focus:ring-2 focus:ring-blue-600focus:ring-opacity-50"
          disabled={isForgotPasswordPending}
        >
          {isForgotPasswordPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </>
  );

  const resetPasswordForm = (
    <>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Reset password
      </h2>
      <form onSubmit={handleResetSubmit(onResetSubmit)} noValidate>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword.newPassword ? 'text' : 'password'}
              {...resetRegister('newPassword')}
              className={`w-full px-3 pr-[45px] py-2 border rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-600 
              ${resetErrors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute grid place-content-center right-0 top-0 h-full w-[45px]
              text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() =>
                setShowPassword((v) => ({ ...v, newPassword: !v.newPassword }))
              }
              aria-label={
                showPassword.newPassword ? 'Hide password' : 'Show password'
              }
            >
              {showPassword.newPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
          {resetErrors.newPassword && (
            <span className="text-red-500 text-xs mt-1">
              {resetErrors.newPassword.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showPassword.confirmPassword ? 'text' : 'password'}
              {...resetRegister('confirmPassword')}
              className={`w-full px-3 pr-[45px] py-2 border rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-600 
              ${resetErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Confirm your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute grid place-content-center right-0 top-0 h-full w-[45px]
              text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() =>
                setShowPassword((v) => ({
                  ...v,
                  confirmPassword: !v.confirmPassword,
                }))
              }
              aria-label={
                showPassword.confirmPassword ? 'Hide password' : 'Show password'
              }
            >
              {showPassword.confirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
          {resetErrors.confirmPassword && (
            <span className="text-red-500 text-xs mt-1">
              {resetErrors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-950
          focus:outline-none focus:ring-2 focus:ring-blue-600focus:ring-opacity-50"
          disabled={isResetPasswordPending}
        >
          {isResetPasswordPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit'
          )}
        </button>

        {isResetReady && (
          <div className="flex ">
            <button
              type="button"
              className="flex items-center gap-1 cursor-pointer mt-4 text-slate-800 hover:underline"
              onClick={resetComponentState}
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        )}
      </form>
    </>
  );

  useEffect(() => {
    if (isForgotPasswordSuccess) setResetReady(isForgotPasswordSuccess);
  }, [isForgotPasswordSuccess]);

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      {isResetReady ? resetPasswordForm : forgotPasswordForm}
    </div>
  );
};

export default ForgotPassword;
