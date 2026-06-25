"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageSquare, Share2, MoreHorizontal, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { likePostAction, deletePostAction, FeedPost } from "@/app/actions/network";
import Comments from "./Comments";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return Math.floor(seconds) + " secs ago";
}

export default function Post({ post }: { post: FeedPost }) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isLiked = user ? post.likes.some((l: any) => l.user_id === user.id) : false;
  const isOwner = user?.id === post.author_id;

  const handleLike = async () => {
    if (!user) return;
    try {
      // Optimistic UI could be implemented here
      await likePostAction(user.id, post.id, isLiked);
    } catch (error) {
      console.error("Failed to like:", error);
    }
  };

  const handleDelete = async () => {
    if (!user || !isOwner) return;
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setIsDeleting(true);
    try {
      await deletePostAction(post.id, user.id);
    } catch (error) {
      console.error("Failed to delete:", error);
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/dashboard/network?post=${post.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Post on MGN',
          text: `Check out this post by ${post.profiles?.full_name}`,
          url: postUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(postUrl);
      alert('Link copied to clipboard!');
    }
  };

  if (isDeleting) return null;

  const authorName = post.profiles?.full_name || "Unknown User";
  const authorAvatar = post.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0052CC&color=fff`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative shrink-0">
            <Image src={authorAvatar} alt={authorName} fill className="object-cover" unoptimized />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-[#0B1B3D] leading-tight">{authorName}</h3>
            {post.profiles?.primary_category && (
              <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{post.profiles.primary_category}</p>
            )}
            <p className="text-[10px] text-gray-400 mt-0.5">
              {timeAgo(post.created_at)}
            </p>
          </div>
        </div>
        
        {/* Menu (Delete option) */}
        {isOwner && (
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10 animate-in fade-in slide-in-from-top-2">
                <button 
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 text-left transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-[14px] text-gray-800 whitespace-pre-wrap">{post.content}</p>
        
        {post.media_url && (
          <div className="mt-3 relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
            <Image 
              src={post.media_url} 
              alt="Post media" 
              fill 
              className="object-cover" 
              unoptimized 
            />
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3 px-1">
        <div className="flex items-center gap-1.5">
          {post.likes.length > 0 && (
            <>
              <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Heart className="w-2.5 h-2.5 fill-current" />
              </div>
              <span>{post.likes.length} Likes</span>
            </>
          )}
        </div>
        <div>
          {post.comments.length > 0 && (
            <span className="hover:text-blue-600 hover:underline cursor-pointer transition-colors" onClick={() => setShowComments(!showComments)}>
              {post.comments.length} comments
            </span>
          )}
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-2 px-1">
        <button 
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors text-[13px] font-medium ${
            isLiked ? 'text-[#0052CC] hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          Like
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors text-[13px] font-medium ${
            showComments ? 'text-[#0052CC] hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          <MessageSquare className={`w-5 h-5 ${showComments ? 'fill-current' : ''}`} />
          Comment
        </button>
        <button 
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        >
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && <Comments postId={post.id} comments={post.comments} />}
    </div>
  );
}
