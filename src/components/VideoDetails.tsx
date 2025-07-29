import React from 'react';
import { ThumbsUp, ThumbsDown, Share, Download, Flag, Eye, Calendar } from 'lucide-react';
import { Video } from '../types';
import { useAuth } from '../context/AuthContext';
import { useVideo } from '../context/VideoContext';
import { formatNumber, formatDate } from '../utils/format';

interface VideoDetailsProps {
  video: Video;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ video }) => {
  const { user } = useAuth();
  const { likeVideo, dislikeVideo, subscribeToChannel } = useVideo();

  const handleSubscribe = () => {
    if (!user) return;
    subscribeToChannel(video.creator.id);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {video.title}
      </h1>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Eye className="w-4 h-4" />
            <span>{formatNumber(video.views)} views</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(video.uploadDate)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => likeVideo(video.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              video.isLiked
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm">{formatNumber(video.likes)}</span>
          </button>
          
          <button
            onClick={() => dislikeVideo(video.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              video.isDisliked
                ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span className="text-sm">{formatNumber(video.dislikes)}</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Share className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Download</span>
          </button>
          
          <button className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-start space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700">
        <img
          src={video.creator.avatar}
          alt={video.creator.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {video.creator.username}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatNumber(video.creator.subscriberCount)} subscribers
              </p>
            </div>
            
            {user && (
              <button
                onClick={handleSubscribe}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  video.creator.isSubscribed
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {video.creator.isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {video.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;