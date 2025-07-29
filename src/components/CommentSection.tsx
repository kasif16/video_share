import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Reply, MoreVertical } from 'lucide-react';
import { Comment } from '../types';
import { useAuth } from '../context/AuthContext';
import { useVideo } from '../context/VideoContext';
import { formatDate, formatNumber } from '../utils/format';

interface CommentSectionProps {
  videoId: string;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ videoId, comments }) => {
  const { user } = useAuth();
  const { addComment, likeComment } = useVideo();
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    addComment(videoId, newComment);
    setNewComment('');
  };

  const handleReply = (commentId: string) => {
    if (!replyText.trim() || !user) return;
    // In a real app, this would add a reply to the specific comment
    setReplyingTo(null);
    setReplyText('');
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => (
    <div className={`flex space-x-3 ${isReply ? 'ml-12 mt-4' : 'mb-6'}`}>
      <img
        src={comment.author.avatar}
        alt={comment.author.username}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-sm text-gray-900 dark:text-white">
            {comment.author.username}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          {comment.content}
        </p>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => likeComment(comment.id)}
            className={`flex items-center space-x-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors ${
              comment.isLiked ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{formatNumber(comment.likes)}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors">
            <ThumbsDown className="w-4 h-4" />
          </button>
          
          {!isReply && (
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors"
            >
              REPLY
            </button>
          )}
          
          <button className="text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        
        {replyingTo === comment.id && (
          <div className="mt-3 flex space-x-3">
            <img
              src={user?.avatar || ''}
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.author.username}...`}
                className="w-full p-2 text-sm border-b border-gray-300 dark:border-gray-600 bg-transparent resize-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                rows={2}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleReply(comment.id)}
                  className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Reply
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                  className="px-4 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {comment.replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {formatNumber(comments.length)} Comments
      </h3>
      
      {/* Add Comment */}
      {user && (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex space-x-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border-b border-gray-300 dark:border-gray-600 bg-transparent resize-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                rows={2}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={() => setNewComment('')}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      {/* Comments List */}
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;