import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface TopNavProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const navLinks = [
  { to: '/casino', label: 'Casino' },
  { to: '/royal-derby', label: 'Royal Derby' },
  { to: '/bilyarbet', label: 'Bilyarbet' },
  { to: '/sportsbook', label: 'Sportsbook' },
];

export default function TopNav({ onLoginClick, onSignupClick }: TopNavProps) {
  const { isLoggedIn, user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 h-16 bg-dark border-b border-border flex items-center px-4 md:px-6">
      {/* Logo */}
      <Link to="/" className="font-black text-white tracking-widest text-lg cursor-pointer select-none shrink-0">
        LuckyTaya
      </Link>

      {/* Nav Links - hidden on mobile */}
      <div className="hidden md:flex items-center gap-6 ml-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `uppercase text-sm font-semibold transition-colors ${
                isActive ? 'text-white underline underline-offset-4' : 'text-[#999] hover:text-white hover:underline hover:underline-offset-4'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        {isLoggedIn && user ? (
          <>
            {/* Balance display */}
            <div className="bg-bg2 border border-border rounded-lg px-3 py-1.5 text-sm text-white font-semibold">
              {user.balance}
            </div>
            {/* Avatar initials */}
            <Link
              to="/account"
              className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-white cursor-pointer"
            >
              {user.initials}
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={onLoginClick}
              className="px-4 py-1.5 text-sm font-semibold text-white border border-border rounded-lg hover:bg-bg2 transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={onSignupClick}
              className="px-4 py-1.5 text-sm font-semibold text-dark bg-accent rounded-lg hover:bg-accent2 transition-colors cursor-pointer"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
