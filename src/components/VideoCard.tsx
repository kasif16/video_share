import React from 'react';
import { Video } from '../types';
import { formatDuration, formatViews, formatDate } from '../utils/format';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
  layout?: 'grid' | 'list';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick, layout = 'grid' }) => {
  if (layout === 'list') {
    return (
      <div 
        className="flex space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
        onClick={() => onClick(video)}
      >
        <div className="relative flex-shrink-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-48 h-27 object-cover rounded-lg"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
            {video.title}
          </h3>
          
          <div className="flex items-center space-x-2 mb-2">
            <img
              src={video.creator.avatar}
              alt={video.creator.username}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {video.creator.username}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {video.description}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{formatViews(video.views)} views</span>
            <span>{formatDate(video.uploadDate)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onClick(video)}
    >
      <div className="relative mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-lg group-hover:rounded-none transition-all duration-300"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>
      
      <div className="flex space-x-3">
        <img
          src={video.creator.avatar}
          alt={video.creator.username}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {video.creator.username}
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{formatViews(video.views)} views</span>
            <span>•</span>
            <span>{formatDate(video.uploadDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;