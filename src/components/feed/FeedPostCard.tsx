"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { toggleLike, addComment, getComments } from "@/app/actions/feed";

export default function FeedPostCard({ post, onInteraction }: { post: any, onInteraction?: () => void }) {
  const { user } = useAuth();
  const [hasLiked, setHasLiked] = useState(post.hasLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLiking, setIsLiking] = useState(false);
  
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const authorName = post.author?.full_name || "Unknown User";
  const authorAvatar = post.author?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0052CC&color=fff`;

  const handleLike = async () => {
    if (!user || isLiking) return;
    
    // Optimistic UI
    setHasLiked(!hasLiked);
    setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1);
    setIsLiking(true);
    
    try {
      await toggleLike(post.id, user.id, hasLiked);
      if (onInteraction) onInteraction();
    } catch (error) {
      // Revert on error
      setHasLiked(hasLiked);
      setLikesCount(likesCount);
      console.error("Failed to like", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleToggleComments = async () => {
    if (!showComments && comments.length === 0) {
      // Fetch comments if we haven't yet
      try {
        const fetched = await getComments(post.id);
        setComments(fetched);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    }
    setShowComments(!showComments);
  };

  const handleSubmitComment = async () => {
    if (!user || !newComment.trim() || isSubmittingComment) return;
    
    setIsSubmittingComment(true);
    try {
      const added = await addComment(post.id, user.id, newComment);
      setComments([...comments, added]);
      setCommentsCount(commentsCount + 1);
      setNewComment("");
      if (onInteraction) onInteraction();
    } catch (error) {
      console.error("Failed to comment", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
          <Image src={authorAvatar} alt={authorName} width={48} height={48} className="object-cover w-full h-full" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#0B1B3D] text-base">{authorName}</h3>
            {post.author?.verified && (
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate max-w-[250px] sm:max-w-md">{post.author?.headline || post.author?.primary_category || "Healthcare Professional"}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{formatDistanceToNow(new Date(post.created_at))} ago</p>
        </div>
        
        <button className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-5 pb-3">
        <p className="text-gray-800 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{post.content}</p>
      </div>

      {/* Media */}
      {post.media_url && (
        <div className="w-full bg-gray-50 max-h-[500px] flex items-center justify-center overflow-hidden border-y border-gray-100">
          <img src={post.media_url} alt="Post media" className="max-w-full max-h-[500px] object-contain" />
        </div>
      )}

      {/* Stats */}
      {(likesCount > 0 || commentsCount > 0) && (
        <div className="px-4 sm:px-5 py-3 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            {likesCount > 0 && (
              <>
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path></svg>
                </div>
                <span>{likesCount}</span>
              </>
            )}
          </div>
          <div>
            {commentsCount > 0 && <span>{commentsCount} comments</span>}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-2 sm:px-4 py-2 flex items-center justify-between">
        <button 
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-colors ${hasLiked ? 'text-blue-600 font-bold' : 'text-gray-500 font-semibold hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill={hasLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514"></path></svg>
          <span className="text-sm">Helpful</span>
        </button>
        <button 
          onClick={handleToggleComments}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-gray-500 font-semibold hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          <span className="text-sm">Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-gray-500 font-semibold hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
          <span className="text-sm">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="bg-gray-50 border-t border-gray-100 p-4">
          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
              <Image src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.full_name || 'U')}&background=0052CC&color=fff`} alt="You" width={32} height={32} />
            </div>
            <div className="flex-grow flex gap-2">
              <input 
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmitComment();
                }}
              />
              <button 
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmittingComment}
                className="bg-[#0052CC] text-white px-4 py-1.5 rounded-full text-sm font-bold disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image src={comment.author?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author?.full_name || 'U')}&background=0052CC&color=fff`} alt={comment.author?.full_name || 'User'} width={32} height={32} />
                </div>
                <div className="flex-grow">
                  <div className="bg-white border border-gray-200 rounded-2xl p-3 inline-block min-w-[200px] max-w-full">
                    <h4 className="font-bold text-[#0B1B3D] text-xs">{comment.author?.full_name || "Unknown"}</h4>
                    <p className="text-[10px] text-gray-500 mb-1">{comment.author?.headline || "Professional"}</p>
                    <p className="text-gray-800 text-sm break-words">{comment.content}</p>
                  </div>
                  <div className="flex gap-3 mt-1 ml-2 text-xs text-gray-500 font-semibold">
                    <button className="hover:text-blue-600 transition-colors">Like</button>
                    <button className="hover:text-blue-600 transition-colors">Reply</button>
                    <span className="text-gray-400 font-normal">{formatDistanceToNow(new Date(comment.created_at))}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
