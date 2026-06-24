"use client";

import PostInput from "./PostInput";
import Post from "./Post";
import { FeedPost } from "@/app/actions/network";

export default function Feed({ posts }: { posts: FeedPost[] }) {
  return (
    <div className="w-full max-w-2xl mx-auto flex-1 h-full pb-20">
      <PostInput />
      
      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
          </div>
          <h3 className="text-[16px] font-bold text-[#0B1B3D] mb-2">No posts yet</h3>
          <p className="text-[13px] text-gray-500 max-w-sm mx-auto">
            Your network is quiet. Be the first to share an update, medical insight, or news!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
