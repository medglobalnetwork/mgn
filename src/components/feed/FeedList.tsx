"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getFeedPosts } from "@/app/actions/feed";
import FeedPostCard from "./FeedPostCard";

export default function FeedList({ refreshTrigger }: { refreshTrigger: number }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await getFeedPosts(user.id);
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user, refreshTrigger]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 animate-pulse">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-grow space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center shadow-sm">
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L16.5 5.5M9 11l3 3L22 4"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">Your feed is waiting</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">Follow professionals and organizations to see their updates here, or create your first post to start connecting.</p>
        <button className="bg-[#0B1B3D] hover:bg-[#1a2b56] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors">
          Find people to follow
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <FeedPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
