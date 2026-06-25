"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { createPost } from "@/app/actions/feed";

export default function CreatePostCard({ onPostCreated }: { onPostCreated?: () => void }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullName = user?.user_metadata?.full_name || "User";
  const avatarUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0052CC&color=fff`;

  const handleSubmit = async () => {
    if (!content.trim() || !user) return;
    
    setIsSubmitting(true);
    try {
      await createPost(user.id, content);
      setContent("");
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error("Failed to post", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm mb-6">
      <div className="flex gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 relative bg-gray-100 border border-gray-200">
          <Image
            src={avatarUrl}
            alt={fullName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-grow">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share a clinical case, research, or thought..."
            className="w-full bg-gray-50 border-none rounded-xl p-3 sm:p-4 text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-gray-400 min-h-[80px]"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex gap-1 sm:gap-2">
          <button className="p-2 sm:px-3 sm:py-2 text-gray-500 hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="text-sm font-semibold hidden sm:block">Photo</span>
          </button>
          <button className="p-2 sm:px-3 sm:py-2 text-gray-500 hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            <span className="text-sm font-semibold hidden sm:block">Video</span>
          </button>
          <button className="p-2 sm:px-3 sm:py-2 text-gray-500 hover:bg-gray-50 rounded-lg flex items-center gap-2 transition-colors">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <span className="text-sm font-semibold hidden sm:block">PDF</span>
          </button>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          className="bg-[#0052CC] hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-[#0052CC] text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl font-bold text-sm sm:text-base transition-colors shadow-sm"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
