import { Link } from 'react-router-dom';
import { selectIsAuth, useAuthStore } from '../../stores/authStore';
import { logout } from '../../api/authService';

export const Navbar = () => {
  const isAuthorized = useAuthStore(selectIsAuth);

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 mb-16">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Forum
        </Link>

        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300 m-0 p-0 list-none">
            {!isAuthorized ? (
              <>
                <li>
                  <Link
                    to="/auth/sign-in"
                    className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Sign-in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/sign-up"
                    className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Sign-up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => logout()}
                  className="transition-colors hover:text-red-600 dark:hover:text-red-400"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
