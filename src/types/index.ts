export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  subscriberCount: number;
  isSubscribed?: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
  views: number;
  likes: number;
  dislikes: number;
  uploadDate: string;
  category: string;
  tags: string[];
  creator: User;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
  creator: User;
  isPublic: boolean;
  videos: Video[];
}