import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import BottomNav from './BottomNav';

interface LayoutProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export default function Layout({ onLoginClick, onSignupClick }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-[#1a1a1a]">
      <TopNav onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
      <main className="flex-1 pb-[70px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
