"use client";
import { Heart, MoreHorizontal } from "lucide-react";
import { useState } from "react";

// Comment Component
export const Comment = ({ comment, onLike, onReply }) => {
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    onLike(comment.id, !isLiked);
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInHours = Math.floor((now - commentTime) / (1000 * 60 * 60));

    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <div className="flex space-x-3 py-4">
      <img
        src={comment.avatar}
        alt={comment.username}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-sm text-gray-900">
            {comment.username}
          </span>
          <span className="text-xs text-gray-500">
            {timeAgo(comment.timestamp)}
          </span>
        </div>
        <p className="text-sm text-gray-800 mb-2">{comment.text}</p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <button
            onClick={onReply}
            className="hover:text-gray-700 transition-colors"
          >
            Reply
          </button>
          {likes > 0 && (
            <span>
              {likes} {likes === 1 ? "like" : "likes"}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <button
          onClick={handleLike}
          className={`p-1.5 rounded-full transition-colors ${
            isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </button>
        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
