import React from 'react';
import { Video } from '../types';
import VideoPlayer from '../components/VideoPlayer';
import VideoDetails from '../components/VideoDetails';
import CommentSection from '../components/CommentSection';
import VideoGrid from '../components/VideoGrid';
import { useVideo } from '../context/VideoContext';
import { recommendedVideos } from '../data/mockData';

interface WatchPageProps {
  video: Video;
  onVideoSelect: (video: Video) => void;
}

const WatchPage: React.FC<WatchPageProps> = ({ video, onVideoSelect }) => {
  const { comments } = useVideo();

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-6">
          <VideoPlayer
            videoUrl={video.videoUrl}
            title={video.title}
            onEnded={() => {
              // Could implement autoplay to next video here
              console.log('Video ended');
            }}
          />
        </div>

        <VideoDetails video={video} />
        
        <CommentSection videoId={video.id} comments={comments} />
      </div>

      {/* Sidebar - Related Videos */}
      <div className="lg:w-96">
        <div className="sticky top-20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Up Next
          </h3>
          <div className="space-y-4">
            {recommendedVideos
              .filter(v => v.id !== video.id)
              .slice(0, 10)
              .map((relatedVideo) => (
                <div 
                  key={relatedVideo.id}
                  className="flex space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                  onClick={() => onVideoSelect(relatedVideo)}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={relatedVideo.thumbnail}
                      alt={relatedVideo.title}
                      className="w-32 h-18 object-cover rounded"
                    />
                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                      {Math.floor(relatedVideo.duration / 60)}:{(relatedVideo.duration % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                      {relatedVideo.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {relatedVideo.creator.username}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{(relatedVideo.views / 1000).toFixed(0)}K views</span>
                      <span>•</span>
                      <span>{Math.floor(Math.random() * 30) + 1} days ago</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;