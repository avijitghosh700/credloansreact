import { useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const ProtectedRouteLayout = () => {
  const [isAuthenticated] = useState(sessionStorage.getItem('token') !== null);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Layout />;
};

export default ProtectedRouteLayout;
