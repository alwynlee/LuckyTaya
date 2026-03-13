import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CasinoPage from './pages/CasinoPage';
import RoyalDerbyPage from './pages/RoyalDerbyPage';
import BilyarbetPage from './pages/BilyarbetPage';
import SportsbookPage from './pages/SportsbookPage';
import AccountPage from './pages/AccountPage';
import LoginModal from './components/auth/LoginModal';
import SignupModal from './components/auth/SignupModal';
import TCModal from './components/auth/TCModal';
import ChatWidget from './components/chat/ChatWidget';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [tcAccepted, setTcAccepted] = useState(false);

  const switchToSignup = () => { setShowLogin(false); setShowSignup(true); };
  const switchToLogin = () => { setShowSignup(false); setShowLogin(true); };

  return (
    <AuthProvider>
      <BrowserRouter>
        <TCModal isOpen={!tcAccepted} onAccept={() => setTcAccepted(true)} />
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={switchToSignup}
        />
        <SignupModal
          isOpen={showSignup}
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={switchToLogin}
        />

        <Routes>
          <Route
            element={
              <Layout
                onLoginClick={() => setShowLogin(true)}
                onSignupClick={() => setShowSignup(true)}
              />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/casino" element={<CasinoPage />} />
            <Route path="/royal-derby" element={<RoyalDerbyPage />} />
            <Route path="/bilyarbet" element={<BilyarbetPage />} />
            <Route path="/sportsbook" element={<SportsbookPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
        </Routes>

        <ChatWidget />
      </BrowserRouter>
    </AuthProvider>
  );
}
