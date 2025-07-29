import React from 'react';
import { Home, TrendingUp, Music, Gamepad2, BookOpen, Film, Trophy, MapPin, Heart, History, Clock, ThumbsUp, PlaySquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVideo } from '../context/VideoContext';
import { categories } from '../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, onViewChange }) => {
  const { user } = useAuth();
  const { selectedCategory, setSelectedCategory } = useVideo();

  const mainMenuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
  ];

  const categoryIcons: Record<string, any> = {
    'Technology': BookOpen,
    'Music': Music,
    'Gaming': Gamepad2,
    'Entertainment': Film,
    'Sports': Trophy,
    'Travel': MapPin,
    'Food': Heart,
    'Education': BookOpen,
    'Lifestyle': Heart,
    'Science': BookOpen,
  };

  const userMenuItems = user ? [
    { id: 'history', label: 'History', icon: History },
    { id: 'watchLater', label: 'Watch Later', icon: Clock },
    { id: 'liked', label: 'Liked Videos', icon: ThumbsUp },
    { id: 'playlists', label: 'Playlists', icon: PlaySquare },
  ] : [];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onViewChange('home');
  };

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    } overflow-y-auto border-r border-gray-200 dark:border-gray-700`}>
      <div className="py-4">
        {/* Main Menu */}
        <div className="mb-6">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  isActive ? 'bg-gray-100 dark:bg-gray-800 border-r-2 border-red-600' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`} />
                {isOpen && (
                  <span className={`ml-6 text-sm font-medium ${
                    isActive ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Categories */}
        {isOpen && (
          <div className="mb-6">
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Categories
            </h3>
            <button
              onClick={() => handleCategoryClick('All')}
              className={`w-full flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                selectedCategory === 'All' ? 'bg-gray-100 dark:bg-gray-800 text-red-600' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-sm">All</span>
            </button>
            {categories.map((category) => {
              const Icon = categoryIcons[category] || BookOpen;
              const isActive = selectedCategory === category;
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    isActive ? 'bg-gray-100 dark:bg-gray-800 text-red-600' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span className="text-sm">{category}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* User Menu */}
        {user && userMenuItems.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {isOpen && (
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Library
              </h3>
            )}
            {userMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    isActive ? 'bg-gray-100 dark:bg-gray-800 border-r-2 border-red-600' : ''
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`} />
                  {isOpen && (
                    <span className={`ml-6 text-sm font-medium ${
                      isActive ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;