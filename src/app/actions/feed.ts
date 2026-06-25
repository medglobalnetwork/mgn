"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function createPost(authorId: string, content: string, mediaUrl?: string) {
  if (!content.trim()) throw new Error("Content cannot be empty");

  const { data, error } = await supabase
    .from('posts')
    .insert({
      author_id: authorId,
      content: content.trim(),
      media_url: mediaUrl || null
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }

  revalidatePath("/dashboard");
  return data;
}

export async function getFeedPosts(currentUserId: string) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id,
      content,
      media_url,
      created_at,
      author:profiles!posts_author_id_fkey(
        id, full_name, avatar_url, headline, primary_category, verified
      ),
      likes(id, user_id),
      comments(id)
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching feed:", error);
    return [];
  }

  // Format the posts to include a boolean hasLiked for the current user
  return (posts || []).map((post: any) => ({
    ...post,
    likesCount: post.likes ? post.likes.length : 0,
    commentsCount: post.comments ? post.comments.length : 0,
    hasLiked: post.likes ? post.likes.some((like: any) => like.user_id === currentUserId) : false,
    likes: undefined // Don't send the full likes array to client
  }));
}

export async function toggleLike(postId: string, userId: string, hasLiked: boolean) {
  if (hasLiked) {
    // Unlike
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);
      
    if (error) {
      console.error("Error unliking post:", error);
      throw error;
    }
  } else {
    // Like
    const { error } = await supabase
      .from('likes')
      .insert({ post_id: postId, user_id: userId });
      
    if (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  }

  revalidatePath("/dashboard");
  return true;
}

export async function addComment(postId: string, authorId: string, content: string) {
  if (!content.trim()) throw new Error("Comment cannot be empty");

  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      author_id: authorId,
      content: content.trim()
    })
    .select(`
      id, content, created_at,
      author:profiles!comments_author_id_fkey(id, full_name, avatar_url, headline)
    `)
    .single();

  if (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }

  revalidatePath("/dashboard");
  return data;
}

export async function getComments(postId: string) {
  const { data: comments, error } = await supabase
    .from('comments')
    .select(`
      id, content, created_at,
      author:profiles!comments_author_id_fkey(id, full_name, avatar_url, headline)
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return comments || [];
}
