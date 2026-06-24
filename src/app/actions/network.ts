"use server";

import { getSupabaseServer } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Define TypeScript interfaces based on our Supabase schema
export interface FeedPost {
  id: string;
  author_id: string;
  content: string;
  media_url: string | null;
  created_at: string;
  updated_at: string;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string;
    primary_category: string | null;
  };
  likes: { id: string; user_id: string }[];
  comments: {
    id: string;
    content: string;
    created_at: string;
    profiles: {
      full_name: string;
      avatar_url: string;
      primary_category: string | null;
    } | null;
  }[];
}

export async function createPostAction(content: string, media_url: string | null, userId: string) {
  const supabase = getSupabaseServer();

  if (!userId) throw new Error("User must be authenticated to post.");
  if (!content) throw new Error("Post content cannot be empty.");

  const { data, error } = await supabase
    .from("posts")
    .insert({
      author_id: userId,
      content,
      media_url,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/network");
  return data;
}

export async function getAllPosts(): Promise<FeedPost[]> {
  const supabase = getSupabaseServer();

  // We use Supabase relationship querying to get the author profile, likes, and comments count.
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles!posts_author_id_fkey(id, full_name, avatar_url, primary_category),
      likes(id, user_id),
      comments(
        id,
        content,
        created_at,
        profiles!comments_author_id_fkey(full_name, avatar_url, primary_category)
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data as unknown as FeedPost[];
}

export async function deletePostAction(postId: string, userId: string) {
  const supabase = getSupabaseServer();

  if (!userId) throw new Error("User must be authenticated.");

  // Verify ownership before deletion
  const { data: post } = await supabase.from("posts").select("author_id").eq("id", postId).single();
  
  if (!post) throw new Error("Post not found.");
  if (post.author_id !== userId) throw new Error("Not authorized to delete this post.");

  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    console.error("Error deleting post:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/network");
}

export async function likePostAction(postId: string, userId: string) {
  const supabase = getSupabaseServer();

  if (!userId) throw new Error("User must be authenticated.");

  // Check if already liked
  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  if (existingLike) {
    // Unlike
    await supabase.from("likes").delete().eq("id", existingLike.id);
  } else {
    // Like
    await supabase.from("likes").insert({ post_id: postId, user_id: userId });
  }

  revalidatePath("/dashboard/network");
}

export async function createCommentAction(postId: string, content: string, userId: string) {
  const supabase = getSupabaseServer();

  if (!userId) throw new Error("User must be authenticated.");
  if (!content) throw new Error("Comment cannot be empty.");

  const { error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      author_id: userId,
      content,
    });

  if (error) {
    console.error("Error creating comment:", error);
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/network");
}
