const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'app', 'actions', 'network.ts');

const appendContent = `
export type FeedPost = any;

export async function createPostAction(userId: string, content: string, mediaUrl?: string) {
  const { data, error } = await supabase.from('posts').insert({
    author_id: userId,
    content,
    media_url: mediaUrl
  }).select().single();
  if (error) throw error;
  revalidatePath('/dashboard');
  return data;
}

export async function likePostAction(userId: string, postId: string, isLiked: boolean) {
  if (isLiked) {
    await supabase.from('likes').delete().eq('user_id', userId).eq('post_id', postId);
  } else {
    await supabase.from('likes').insert({ user_id: userId, post_id: postId });
  }
  revalidatePath('/dashboard');
}

export async function deletePostAction(postId: string) {
  await supabase.from('posts').delete().eq('id', postId);
  revalidatePath('/dashboard');
}

export async function createCommentAction(userId: string, postId: string, content: string) {
  await supabase.from('comments').insert({ user_id: userId, post_id: postId, content });
  revalidatePath('/dashboard');
}

export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(\`
      id,
      content,
      media_url,
      created_at,
      author:profiles!posts_author_id_fkey(
        id, full_name, avatar_url, headline
      ),
      likes(id, user_id),
      comments(id, content, created_at, user:profiles(id, full_name, avatar_url))
    \`)
    .order('created_at', { ascending: false });
  if (error) return [];
  return data;
}
`;

fs.appendFileSync(file, appendContent);
console.log("Fixed network actions.");
