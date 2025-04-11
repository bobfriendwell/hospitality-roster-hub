
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  username: string;
  role: 'admin' | 'user' | null;
  isLoggedIn: boolean;
};

type AuthContextType = {
  user: User;
  logout: () => void;
};

const defaultUser: User = {
  username: '',
  role: null,
  isLoggedIn: false
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage on initial render
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          username: parsedUser.username || '',
          role: parsedUser.role || null,
          isLoggedIn: !!parsedUser.isLoggedIn
        });
      } catch (e) {
        console.error('Failed to parse user data from localStorage', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const logout = () => {
    // Clear user data from localStorage
    localStorage.setItem('user', JSON.stringify({ isLoggedIn: false }));
    
    // Update state
    setUser(defaultUser);
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
