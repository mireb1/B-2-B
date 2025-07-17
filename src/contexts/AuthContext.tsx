import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au démarrage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulation d'une API - remplacer par votre logique d'authentification
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Administrateur',
          role: 'admin',
          company: 'B2B Marketplace'
        };
        setUser(adminUser);
        localStorage.setItem('token', 'admin-token');
        localStorage.setItem('user', JSON.stringify(adminUser));
      } else if (email === 'user@example.com' && password === 'user123') {
        const normalUser: User = {
          id: '2',
          email: 'user@example.com',
          name: 'Utilisateur',
          role: 'user',
          company: 'Ma Société'
        };
        setUser(normalUser);
        localStorage.setItem('token', 'user-token');
        localStorage.setItem('user', JSON.stringify(normalUser));
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
