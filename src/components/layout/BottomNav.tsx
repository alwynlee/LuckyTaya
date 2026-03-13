import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/casino', label: 'Casino', icon: '\uD83C\uDFB0' },
  { to: '/sportsbook', label: 'Sports', icon: '\u26BD' },
  { to: '/', label: 'Home', icon: 'LT', isHome: true },
  { to: '/royal-derby', label: 'Derby', icon: '\uD83D\uDC0E' },
  { to: '/bilyarbet', label: 'Bilyarbet', icon: '\uD83C\uDFB1' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-[62px] bg-dark border-t border-border flex items-center justify-around md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs transition-colors ${
              isActive ? 'text-white' : 'text-muted'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {item.isHome ? (
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black -mt-4 border-2 ${
                    isActive
                      ? 'bg-accent border-accent text-white'
                      : 'bg-bg2 border-border text-muted'
                  }`}
                >
                  LT
                </div>
              ) : (
                <span className={`text-xl ${isActive ? 'brightness-125' : 'opacity-60'}`}>
                  {item.icon}
                </span>
              )}
              <span className={`text-[10px] font-semibold ${isActive ? 'text-white' : 'text-muted'}`}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
