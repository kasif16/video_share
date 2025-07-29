import React, { createContext, useContext, useState } from 'react';
import { Video, Comment } from '../types';
import { mockVideos, mockComments } from '../data/mockData';

interface VideoContextType {
  videos: Video[];
  comments: Comment[];
  currentVideo: Video | null;
  searchQuery: string;
  selectedCategory: string;
  setCurrentVideo: (video: Video | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  likeVideo: (videoId: string) => void;
  dislikeVideo: (videoId: string) => void;
  addComment: (videoId: string, content: string) => void;
  likeComment: (commentId: string) => void;
  subscribeToChannel: (userId: string) => void;
  filteredVideos: Video[];
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const likeVideo = (videoId: string) => {
    setVideos(prev => prev.map(video => {
      if (video.id === videoId) {
        const wasLiked = video.isLiked;
        const wasDisliked = video.isDisliked;
        
        return {
          ...video,
          likes: wasLiked ? video.likes - 1 : video.likes + 1,
          dislikes: wasDisliked ? video.dislikes - 1 : video.dislikes,
          isLiked: !wasLiked,
          isDisliked: false,
        };
      }
      return video;
    }));
  };

  const dislikeVideo = (videoId: string) => {
    setVideos(prev => prev.map(video => {
      if (video.id === videoId) {
        const wasLiked = video.isLiked;
        const wasDisliked = video.isDisliked;
        
        return {
          ...video,
          likes: wasLiked ? video.likes - 1 : video.likes,
          dislikes: wasDisliked ? video.dislikes - 1 : video.dislikes + 1,
          isLiked: false,
          isDisliked: !wasDisliked,
        };
      }
      return video;
    }));
  };

  const addComment = (videoId: string, content: string) => {
    // In a real app, this would make an API call
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        id: 'current-user',
        username: 'CurrentUser',
        email: 'current@user.com',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        subscriberCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };
    
    setComments(prev => [newComment, ...prev]);
  };

  const likeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      }
      return comment;
    }));
  };

  const subscribeToChannel = (userId: string) => {
    setVideos(prev => prev.map(video => {
      if (video.creator.id === userId) {
        return {
          ...video,
          creator: {
            ...video.creator,
            isSubscribed: !video.creator.isSubscribed,
            subscriberCount: video.creator.isSubscribed 
              ? video.creator.subscriberCount - 1 
              : video.creator.subscriberCount + 1,
          },
        };
      }
      return video;
    }));
  };

  return (
    <VideoContext.Provider value={{
      videos,
      comments,
      currentVideo,
      searchQuery,
      selectedCategory,
      setCurrentVideo,
      setSearchQuery,
      setSelectedCategory,
      likeVideo,
      dislikeVideo,
      addComment,
      likeComment,
      subscribeToChannel,
      filteredVideos,
    }}>
      {children}
    </VideoContext.Provider>
  );
};