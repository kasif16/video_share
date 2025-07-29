import React from 'react';
import { Video } from '../types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  layout?: 'grid' | 'list';
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoSelect, layout = 'grid' }) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No videos found</p>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className="space-y-4">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={onVideoSelect}
            layout="list"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={onVideoSelect}
        />
      ))}
    </div>
  );
};

export default VideoGrid;