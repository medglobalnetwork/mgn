"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Send, X } from "lucide-react";
import { createPostAction } from "@/app/actions/network";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function PostInput() {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Optional: Add image preview state if implementing actual Supabase storage upload
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fullName = user?.user_metadata?.full_name || "User";
  const photoUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0052CC&color=fff`;

  const handleSubmit = async () => {
    if (!content.trim() || !user) return;
    
    setIsSubmitting(true);
    try {
      // In a real scenario, you'd upload the image file to Supabase Storage first,
      // get the public URL, and pass it here instead of null.
      await createPostAction(content, null, user.id);
      setContent("");
    } catch (error) {
      console.error("Failed to post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden relative shrink-0">
          <Image src={photoUrl} alt={fullName} fill className="object-cover" unoptimized />
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share an update, medical case, or insight..."
            className="w-full bg-transparent resize-none outline-none text-[14px] text-gray-800 placeholder:text-gray-400 min-h-[60px]"
            rows={2}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50">
          <ImageIcon className="w-5 h-5 text-blue-500" />
          <span className="text-[13px] font-medium">Media</span>
        </button>
        
        <button 
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          className="bg-[#0052CC] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-1.5 transition-colors"
        >
          {isSubmitting ? "Posting..." : (
            <>
              Post
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
