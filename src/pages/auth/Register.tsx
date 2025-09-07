import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '../../shared/queries/authQueries';

import { Eye, EyeOff, Loader } from 'lucide-react';
import { Link } from 'react-router';

const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required.' }),
    lastName: z.string().min(1, { message: 'Last name is required.' }),
    email: z.email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type registerFormValues = z.infer<typeof registerSchema>;

const Register: FC = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { mutate: signUp, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: registerFormValues) => {
    if (!data) return;

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    signUp(payload);
  };

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="firstName"
          >
            Firstname
          </label>
          <input
            id="firstName"
            type="firstName"
            {...register('firstName')}
            className={`w-full px-3 py-2 border rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-600
            ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your first name"
            autoComplete="firstName"
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="lastName"
          >
            Lastname
          </label>
          <input
            id="lastName"
            type="lastName"
            {...register('lastName')}
            className={`w-full px-3 py-2 border rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-600
            ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your last name"
            autoComplete="lastName"
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </span>
          )}
        </div>
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
              type={showPassword.password ? 'text' : 'password'}
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
              onClick={() =>
                setShowPassword((v) => ({ ...v, password: !v.password }))
              }
              aria-label={
                showPassword.password ? 'Hide password' : 'Show password'
              }
            >
              {showPassword.password ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="mb-6">
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
              {...register('confirmPassword')}
              className={`w-full px-3 pr-[45px] py-2 border rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-600 
              ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
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
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
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
              Signing Up...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>

        <div className="mt-4">
          <div className="important-links flex flex-col gap-y-2 text-center">
            <Link
              to="/auth/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
