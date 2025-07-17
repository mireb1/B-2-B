import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Grid } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { itemCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      icon: Home,
      label: 'Accueil',
      path: '/',
      count: 0
    },
    {
      icon: Grid,
      label: 'Catégories',
      path: '/categories',
      count: 0
    },
    {
      icon: Search,
      label: 'Rechercher',
      path: '/search',
      count: 0
    },
    {
      icon: ShoppingCart,
      label: 'Panier',
      path: '/checkout',
      count: itemCount
    },
    {
      icon: User,
      label: user ? 'Profil' : 'Connexion',
      path: user ? '/profile' : '/login',
      count: 0
    }
  ];

  return (
    <nav className="mobile-nav">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 min-w-0 flex-1 relative ${
                isActive(item.path)
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.count > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.count > 9 ? '9+' : item.count}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
