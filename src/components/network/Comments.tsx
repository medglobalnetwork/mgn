"use client";

import { useState } from "react";
import { createCommentAction } from "@/app/actions/network";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Send } from "lucide-react";

interface CommentProps {
  postId: string;
  comments: { id: string }[]; // You can expand this if you fetch comment content
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
      {/* Existing Comments (Placeholder - need to fetch comment author details in query to display) */}
      {comments.length > 0 && (
        <div className="mb-4">
          <p className="text-[12px] text-gray-500 font-medium mb-3">View all {comments.length} comments</p>
          {/* We would map through populated comments here */}
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
