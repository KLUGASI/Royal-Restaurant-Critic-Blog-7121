import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCrown, FiMenu, FiX, FiStar, FiUser, FiHome, FiShoppingBag } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Royal Court', icon: FiHome },
    { path: '/reviews', label: 'Chronicles', icon: FiStar },
    { path: '/recommendations', label: 'Royal Shop', icon: FiShoppingBag },
    { path: '/about', label: 'The Critic', icon: FiUser }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 shadow-2xl border-b-4 border-amber-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <SafeIcon icon={FiCrown} className="h-8 w-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-amber-400 font-cinzel tracking-wide">
                The Royal Palate
              </h1>
              <p className="text-purple-200 text-sm font-crimson italic">
                Chronicles of Culinary Excellence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-cinzel font-medium ${
                  location.pathname === item.path
                    ? 'bg-amber-400 text-purple-900 shadow-lg'
                    : 'text-purple-200 hover:text-amber-400 hover:bg-purple-800/50'
                }`}
              >
                <SafeIcon icon={item.icon} className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-purple-200 hover:text-amber-400 hover:bg-purple-800/50 transition-colors"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-6 border-t border-purple-700/50 mt-4 pt-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-300 font-cinzel ${
                  location.pathname === item.path
                    ? 'bg-amber-400 text-purple-900'
                    : 'text-purple-200 hover:text-amber-400 hover:bg-purple-800/50'
                }`}
              >
                <SafeIcon icon={item.icon} className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;