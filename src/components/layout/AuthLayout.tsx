import { useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const AuthLayout = () => {
  const [isAuthenticated] = useState(sessionStorage.getItem('token') !== null);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="auth-layout min-h-screen min-w-screen w-full h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      <main className="flex items-center justify-center w-full h-full">
        <div className="auth-content w-full h-full grid place-items-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
