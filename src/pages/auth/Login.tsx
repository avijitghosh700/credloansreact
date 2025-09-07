import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../shared/queries/authQueries';

import { Loader, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router';

const loginSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            {...register('email')}
            className={`w-full px-3 py-2 border rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-600
            ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your email"
            autoComplete="email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
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
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`w-full px-3 pr-[45px] py-2 border rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-600 
              ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute grid place-content-center right-0 top-0 h-full w-[45px]
              text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-950
          focus:outline-none focus:ring-2 focus:ring-blue-600focus:ring-opacity-50"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="animate-spin" />
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="mt-4">
          <div className="important-links flex flex-col gap-y-2 text-center">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

            <Link
              to="/auth/register"
              className="text-sm text-blue-600 hover:underline"
            >
              Don't have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
