import { useEffect, useRef, useState } from 'react';
import { CircleUserRound, LogOut } from 'lucide-react';
import { useLogout } from '../../../shared/queries/authQueries';
import { useNavigate } from 'react-router';
import Avatar from '../../avatar/Avatar';
import type { TUser } from '../../../shared/types/auth.type';
import { useOutsideClick } from '../../../shared/hooks/useOutSideClick';

interface HeaderProps {
  user: TUser;
}

const Header = ({ user }: HeaderProps) => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLElement>(null);
  useOutsideClick(dropdownRef as never, () => setOpen(false), isOpen);

  const navigate = useNavigate();
  const { mutate: logout } = useLogout(() => {
    navigate('/auth/login');
  });

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header className="header w-full bg-white border-b border-slate-300 shadow-md h-20">
      <div className="container h-full mx-auto px-4 py-2">
        <div className="row flex items-center justify-between h-full">
          <h1 className="text-2xl font-bold text-gray-800">CredLoans</h1>

          <nav className="header__navigation">
            <ul className="flex space-x-4">
              <li className="relative" ref={dropdownRef as never}>
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-800 cursor-pointer p-1"
                  onClick={() => setOpen(!isOpen)}
                >
                  {user && <Avatar user={user} />}
                </button>

                {isOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border 
                    border-slate-300 rounded-md shadow-lg z-50 overflow-hidden"
                  >
                    <ul>
                      <li
                        className="flex items-center gap-2 p-4 
                      text-gray-600 border-b border-slate-300"
                      >
                        <CircleUserRound size={16} />
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user.email}
                      </li>
                      <li>
                        <button
                          type="button"
                          className="w-full text-left p-4 
                          text-red-600 bg-red-50 hover:bg-red-100
                          cursor-pointer flex items-center gap-2"
                          onClick={handleLogout}
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
