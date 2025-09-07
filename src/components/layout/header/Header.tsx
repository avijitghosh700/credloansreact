import { LogOut } from 'lucide-react';
import { useLogout } from '../../../shared/queries/authQueries';
import { useNavigate } from 'react-router';

interface HeaderProps {
  user: {
    name?: string;
    email?: string;
  };
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout(() => {
    navigate('/auth/login');
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header w-full bg-white border-b border-slate-300 shadow-md min-h-12">
      <div className="container mx-auto px-4 py-2">
        <div className="row flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">CredLoans</h1>

          <nav className="header__navigation">
            <ul className="flex space-x-4">
              <li>
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-800 cursor-pointer p-1"
                  onClick={handleLogout}
                >
                  <LogOut />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
