"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Send, X, Loader2 } from "lucide-react";
import { createPostAction } from "@/app/actions/network";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function PostInput() {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const fullName = user?.user_metadata?.full_name || "User";
  const photoUrl = user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=0052CC&color=fff`;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB");
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if ((!content.trim() && !imageFile) || !user) return;
    
    setIsSubmitting(true);
    try {
      let mediaUrl = null;
      
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('post_images')
          .upload(filePath, imageFile);
          
        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from('post_images')
          .getPublicUrl(filePath);
          
        mediaUrl = publicUrlData.publicUrl;
      }

      await createPostAction(content, mediaUrl, user.id);
      setContent("");
      removeImage();
    } catch (error) {
      console.error("Failed to post:", error);
      alert("Failed to create post. Please try again.");
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
      
      {imagePreview && (
        <div className="relative w-full h-48 sm:h-64 mt-3 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
          <Image src={imagePreview} alt="Preview" fill className="object-contain" unoptimized />
          <button 
            onClick={removeImage}
            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <div>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
          >
            <ImageIcon className="w-5 h-5 text-blue-500" />
            <span className="text-[13px] font-medium">Media</span>
          </button>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={(!content.trim() && !imageFile) || isSubmitting}
          className="bg-[#0052CC] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-1.5 transition-colors"
        >
          {isSubmitting ? (
            <>
              Posting...
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </>
          ) : (
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
