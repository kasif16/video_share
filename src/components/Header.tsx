import React, { useState } from 'react';
import { Search, Upload, Bell, User, Menu, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVideo } from '../context/VideoContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  onShowUpload: () => void;
  onShowAuth: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onShowUpload, onShowAuth }) => {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useVideo();
  const { isDark, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
              VideoShare
            </span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full px-4 py-2 pl-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-l-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 border-l-0 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {user && (
            <>
              <button
                onClick={onShowUpload}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
              </button>
            </>
          )}

          <div className="relative">
            {user ? (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
            ) : (
              <button
                onClick={onShowAuth}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <User className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">Sign in</span>
              </button>
            )}

            {/* User Menu Dropdown */}
            {showUserMenu && user && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;