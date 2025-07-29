import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { VideoProvider } from './context/VideoContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';
import WatchPage from './pages/WatchPage';
import AuthModal from './components/AuthModal';
import UploadModal from './components/UploadModal';
import { Video } from './types';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
    setCurrentView('watch');
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    if (view !== 'watch') {
      setCurrentVideo(null);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'trending':
        return <TrendingPage onVideoSelect={handleVideoSelect} />;
      case 'watch':
        return currentVideo ? (
          <WatchPage video={currentVideo} onVideoSelect={handleVideoSelect} />
        ) : (
          <HomePage onVideoSelect={handleVideoSelect} />
        );
      default:
        return <HomePage onVideoSelect={handleVideoSelect} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <VideoProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              onShowUpload={() => setShowUploadModal(true)}
              onShowAuth={() => setShowAuthModal(true)}
            />
            
            <div className="flex pt-16">
              <Sidebar
                isOpen={sidebarOpen}
                currentView={currentView}
                onViewChange={handleViewChange}
              />
              
              <main className={`flex-1 transition-all duration-300 ${
                sidebarOpen ? 'ml-64' : 'ml-16'
              }`}>
                {renderContent()}
              </main>
            </div>

            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
            />

            <UploadModal
              isOpen={showUploadModal}
              onClose={() => setShowUploadModal(false)}
            />
          </div>
        </VideoProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;