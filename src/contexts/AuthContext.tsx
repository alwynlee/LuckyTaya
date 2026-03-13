import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  name: string;
  initials: string;
  balance: string;
  id: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUser: User = {
  name: 'Alwyn Santos',
  initials: 'AL',
  balance: '\u20B112,450',
  id: 'LP-2024-00847',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user: isLoggedIn ? mockUser : null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
