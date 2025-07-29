import React from 'react';
import { useVideo } from '../context/VideoContext';
import VideoGrid from '../components/VideoGrid';
import { trendingVideos, recommendedVideos } from '../data/mockData';

interface HomePageProps {
  onVideoSelect: (video: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onVideoSelect }) => {
  const { filteredVideos, searchQuery, selectedCategory } = useVideo();

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (selectedCategory !== 'All') {
      return selectedCategory;
    }
    return 'Home';
  };

  const getVideosToShow = () => {
    if (searchQuery || selectedCategory !== 'All') {
      return filteredVideos;
    }
    return filteredVideos;
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {getPageTitle()}
        </h1>

        {!searchQuery && selectedCategory === 'All' && (
          <>
            {/* Trending Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Trending Now
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingVideos.map((video) => (
                  <div key={`trending-${video.id}`} className="relative">
                    <div 
                      className="group cursor-pointer"
                      onClick={() => onVideoSelect(video)}
                    >
                      <div className="relative mb-3">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full aspect-video object-cover rounded-lg"
                        />
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                          TRENDING
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {video.creator.username}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recommended for You
              </h2>
              <VideoGrid videos={recommendedVideos} onVideoSelect={onVideoSelect} />
            </section>
          </>
        )}

        {/* All Videos / Search Results */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {searchQuery ? 'Search Results' : selectedCategory === 'All' ? 'All Videos' : `${selectedCategory} Videos`}
          </h2>
          <VideoGrid videos={getVideosToShow()} onVideoSelect={onVideoSelect} />
        </section>
      </div>
    </div>
  );
};

export default HomePage;