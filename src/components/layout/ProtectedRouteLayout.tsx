import { Navigate, Outlet } from 'react-router';
import Header from './header/Header';
import Footer from './footer/Footer';
import { useUserProfile } from '../../shared/queries/authQueries';
import useAuthStore from '../../shared/store/authSlice';
import { useEffect } from 'react';
import { refreshToken } from '../../shared/services/base.api';
import { Loader } from 'lucide-react';

const Layout = () => {
  const { data: user } = useUserProfile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const ProtectedRouteLayout = () => {
  const { isAuthenticated, loading, setLoading } = useAuthStore();

  useEffect(() => {
    (async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log('No valid session', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center min-h-screen text-slate-800">
        <Loader size={60} className="animate-spin" />
        <div className="loader text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Layout />;
};

export default ProtectedRouteLayout;
