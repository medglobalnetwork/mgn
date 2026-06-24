"use client";

import { useState } from "react";
import { createCommentAction } from "@/app/actions/network";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Send } from "lucide-react";

interface CommentType {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
    primary_category: string | null;
  } | null;
}

interface CommentProps {
  postId: string;
  comments: CommentType[];
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m";
  return Math.floor(seconds) + "s";
}

export default function Comments({ postId, comments }: CommentProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullName = user?.user_metadata?.full_name || "User";
  const photoUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0052CC&color=fff`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await createCommentAction(postId, content, user.id);
      setContent("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-3 mt-3 border-t border-gray-50">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="mb-4">
          <p className="text-[12px] text-gray-500 font-medium mb-3">View all {comments.length} comments</p>
          <div className="flex flex-col gap-4">
            {comments.map((comment) => {
              const authorName = comment.profiles?.full_name || "Unknown User";
              const authorAvatar = comment.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0052CC&color=fff`;
              return (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden relative shrink-0">
                    <Image src={authorAvatar} alt={authorName} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none p-3 relative">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="text-[13px] font-bold text-[#0B1B3D] leading-tight">{authorName}</h4>
                        {comment.profiles?.primary_category && (
                          <p className="text-[10px] text-gray-500 leading-tight">{comment.profiles.primary_category}</p>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-2">{timeAgo(comment.created_at)}</span>
                    </div>
                    <p className="text-[13px] text-gray-800 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Comment Input */}
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden relative shrink-0 mt-0.5">
          <Image src={photoUrl} alt={fullName} fill className="object-cover" unoptimized />
        </div>
        <form onSubmit={handleSubmit} className="flex-1 relative">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a professional comment..."
            className="w-full bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-[13px] outline-none focus:border-blue-200 focus:bg-white transition-colors pr-10"
          />
          <button 
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#0052CC] disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
