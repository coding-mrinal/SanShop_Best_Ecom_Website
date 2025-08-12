import React, { createContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, Sun, Moon, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem('darkMode');
    return savedPreference !== null ? 
      savedPreference === 'true' : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode: () => setDarkMode(prev => !prev) }}>
      {children}
    </ThemeContext.Provider>
  );
};

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { getTotalItems } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/categories', label: 'Categories' },
    { path: '/deals', label: 'Deals' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const userMenuItems = [
    { to: '/profile', label: 'My Profile' },
    { to: '/orders', label: 'My Orders' },
    { to: '/settings', label: 'Settings' }
  ];

  const searchSuggestions = ['iPhone 15 Pro', 'MacBook Air', 'AirPods Pro', 'Samsung Galaxy', 'PlayStation 5'];
  const filteredSuggestions = searchQuery 
    ? searchSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())) 
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setIsUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;
  const cls = (light, dark) => darkMode ? dark : light;

  return (
    <header className={`${cls('bg-slate-50', 'bg-slate-900')} shadow-md sticky top-0 z-50 border-b ${cls('border-slate-200', 'border-slate-800')}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-1.5 sm:p-2 rounded-lg">
              <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">SanShop</span>
          </Link>
          
          <nav className="hidden lg:flex space-x-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-2.5 py-2 sm:px-3 sm:py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(path)
                    ? cls('text-teal-700 bg-teal-100', 'text-teal-400 bg-slate-800')
                    : cls('text-slate-600 hover:text-teal-600 hover:bg-slate-200', 'text-slate-300 hover:text-white hover:bg-slate-800')
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="relative hidden md:block" ref={searchRef}>
              <div className={`flex items-center ${cls('bg-slate-100', 'bg-slate-800')} rounded-full px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-300 ${isSearchOpen && 'ring-2 ring-teal-500'}`}>
                <Search className={`h-4 w-4 ${cls('text-slate-500', 'text-slate-400')}`} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className={`bg-transparent border-none focus:outline-none ml-2 py-1 text-xs sm:text-sm w-32 md:w-40 lg:w-48 ${cls('text-slate-700 placeholder:text-slate-500', 'text-white placeholder:text-slate-400')}`}
                />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="ml-1 sm:ml-2"><X className={`h-4 w-4 ${cls('text-slate-500', 'text-slate-400')}`} /></button>}
              </div>
              {isSearchOpen && searchQuery && (
                <div className={`absolute top-full mt-1 sm:mt-2 w-full ${cls('bg-white border-slate-200', 'bg-slate-800 border-slate-700')} rounded-lg shadow-xl border py-1 sm:py-2 z-50`}>
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((suggestion) => (
                      <div
                        key={suggestion}
                        className={`px-3 sm:px-4 py-2 text-sm cursor-pointer ${cls('hover:bg-slate-100 text-slate-700', 'hover:bg-slate-700 text-slate-200')}`}
                        onClick={() => { setSearchQuery(suggestion); setIsSearchOpen(false); }}
                      >
                        <Search className="h-4 w-4 inline mr-2 text-slate-400" />{suggestion}
                      </div>
                    ))
                  ) : (
                    <div className={`px-3 sm:px-4 py-2 text-sm ${cls('text-slate-500', 'text-slate-400')}`}>No results found</div>
                  )}
                </div>
              )}
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
            
            <Link to="/wishlist" className={`relative p-1.5 sm:p-2 rounded-full ${cls('hover:bg-slate-200', 'hover:bg-slate-800')}`} aria-label="Wishlist">
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${cls('text-slate-600', 'text-slate-300')}`} />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[0.6rem] sm:text-xs rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center font-bold">2</span>
            </Link>
            
            <Link to="/cart" className={`relative p-1.5 sm:p-2 rounded-full ${cls('hover:bg-slate-200', 'hover:bg-slate-800')}`} aria-label="Cart">
              <ShoppingCart className={`h-4 w-4 sm:h-5 sm:w-5 ${cls('text-slate-600', 'text-slate-300')}`} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-teal-600 text-white text-[0.6rem] sm:text-xs rounded-full h-3.5 w-3.5 sm:h-5 sm:w-5 flex items-center justify-center font-bold">{getTotalItems()}</span>
              )}
            </Link>
            
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-1 p-1 rounded-full ${cls('hover:bg-slate-200', 'hover:bg-slate-800')}`}
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
                <ChevronDown className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''} ${cls('text-slate-600', 'text-slate-300')}`} />
              </button>
              {isUserMenuOpen && (
                <div className={`absolute right-0 mt-1 sm:mt-2 w-44 sm:w-48 ${cls('bg-white border-slate-200', 'bg-slate-800 border-slate-700')} rounded-lg shadow-xl border py-1 sm:py-2 z-50`}>
                  <div className={`px-3 sm:px-4 py-2 border-b ${cls('border-slate-200', 'border-slate-700')}`}>
                    <p className={`font-semibold ${cls('text-slate-800', 'text-white')}`}>John Doe</p>
                    <p className={`text-xs sm:text-sm ${cls('text-slate-500', 'text-slate-400')}`}>john@example.com</p>
                  </div>
                  {userMenuItems.map(({ to, label }) => (
                    <Link key={to} to={to} className={`block px-3 sm:px-4 py-2 text-xs sm:text-sm ${cls('text-slate-700 hover:bg-slate-100', 'text-slate-300 hover:bg-slate-700')}`} onClick={() => setIsUserMenuOpen(false)}>
                      {label}
                    </Link>
                  ))}
                  <hr className={cls('border-slate-200 my-1', 'border-slate-700 my-1')} />
                  <button className={`block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm ${cls('text-red-600 hover:bg-slate-100', 'text-red-400 hover:bg-slate-700')}`}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg" aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen}>
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <>
            <div className="py-3 md:hidden">
              <div className={`flex items-center ${cls('bg-slate-100', 'bg-slate-800')} rounded-full px-4 py-2`}>
                <Search className={`h-4 w-4 ${cls('text-slate-500', 'text-slate-400')}`} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-transparent border-none focus:outline-none ml-2 py-1 flex-1 text-sm ${cls('text-slate-700 placeholder:text-slate-500', 'text-white placeholder:text-slate-400')}`}
                />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="ml-2"><X className={`h-4 w-4 ${cls('text-slate-500', 'text-slate-400')}`} /></button>}
              </div>
            </div>
            <div className={`md:hidden py-3 border-t ${cls('border-slate-200', 'border-slate-700')}`}>
              <nav className="flex flex-col space-y-1">
                {navLinks.map(({ path, label }) => (
                  <Link key={path} to={path} className={`px-3 py-2.5 rounded-lg text-sm font-medium ${isActive(path) ? cls('text-teal-700 bg-teal-100', 'text-teal-400 bg-slate-800') : cls('text-slate-700 hover:bg-slate-100', 'text-slate-300 hover:bg-slate-800')}`} onClick={() => setIsMenuOpen(false)}>
                    {label}
                  </Link>
                ))}
              </nav>
              <div className={`mt-4 pt-4 border-t ${cls('border-slate-200', 'border-slate-700')}`}>
                <Link to="/profile" className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg ${cls('hover:bg-slate-100', 'hover:bg-slate-800')}`} onClick={() => setIsMenuOpen(false)}>
                  <User className="h-5 w-5" /><span>My Account</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;