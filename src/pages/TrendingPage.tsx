import React from 'react';
import { trendingVideos } from '../data/mockData';
import VideoGrid from '../components/VideoGrid';

interface TrendingPageProps {
  onVideoSelect: (video: any) => void;
}

const TrendingPage: React.FC<TrendingPageProps> = ({ onVideoSelect }) => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Trending
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          See what's popular on VideoShare right now
        </p>
      </div>

      <VideoGrid videos={trendingVideos} onVideoSelect={onVideoSelect} />
    </div>
  );
};

export default TrendingPage;