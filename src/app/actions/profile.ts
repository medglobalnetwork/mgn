"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface ProfileData {
  id: string;
  full_name: string;
  avatar_url: string;
  headline: string;
  bio: string;
  city: string;
  country: string;
  primary_category?: string;
  verified?: boolean;
}

export interface ExperienceData {
  id: string;
  title: string;
  company_name: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  location: string | null;
  description: string | null;
}

export interface EducationData {
  id: string;
  institution_name: string;
  degree: string;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
}

export interface FullProfile extends ProfileData {
  experience: ExperienceData[];
  education: EducationData[];
}

export async function getProfileData(profileId: string) {
  // 1. Fetch main profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (profileError || !profile) {
    console.error("Error fetching profile:", profileError);
    return null;
  }

  // 2. Fetch experience
  const { data: experience } = await supabase
    .from('experience')
    .select('*')
    .eq('user_id', profileId)
    .order('start_date', { ascending: false });

  // 3. Fetch education
  const { data: education } = await supabase
    .from('education')
    .select('*')
    .eq('user_id', profileId)
    .order('start_date', { ascending: false });

  // 4. Fetch trust score
  const { data: trustScore } = await supabase
    .from('trust_scores')
    .select('total_score, trust_level')
    .eq('user_id', profileId)
    .single();

  // 5. Fetch Connections Count
  const { count: connectionsCount } = await supabase
    .from('connections')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'accepted')
    .or(`requester_id.eq.${profileId},receiver_id.eq.${profileId}`);

  return {
    ...profile,
    experience: experience || [],
    education: education || [],
    trust_score: trustScore?.total_score || 0,
    trust_level: trustScore?.trust_level || 'NEW',
    connections_count: connectionsCount || 0,
    followers_count: connectionsCount || 0,
  };
}

export async function getUserProfile(userId: string) {
  return getProfileData(userId);
}

export async function updateProfileInfo(userId: string, data: any) {
  const { error } = await supabase.from('profiles').update(data).eq('id', userId);
  if (error) throw error;
  revalidatePath('/dashboard/settings');
}

export async function addExperience(userId: string, data: any) {
  const { error } = await supabase.from('experience').insert({ ...data, user_id: userId });
  if (error) throw error;
  revalidatePath('/dashboard/settings');
}

export async function deleteExperience(id: string) {
  const { error } = await supabase.from('experience').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/dashboard/settings');
}

export async function addEducation(userId: string, data: any) {
  const { error } = await supabase.from('education').insert({ ...data, user_id: userId });
  if (error) throw error;
  revalidatePath('/dashboard/settings');
}

export async function deleteEducation(id: string) {
  const { error } = await supabase.from('education').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/dashboard/settings');
}

export async function getDashboardStats(userId: string) {
  // Connections count
  const { count: connectionsCount } = await supabase
    .from('connections')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'accepted')
    .or(`requester_id.eq.${userId},receiver_id.eq.${userId}`);

  // Profile views count
  const { count: viewsCount } = await supabase
    .from('profile_views')
    .select('*', { count: 'exact', head: true })
    .eq('viewed_profile_id', userId);

  return {
    connections: connectionsCount || 0,
    views: viewsCount || 0
  };
}

export async function getTrendingTopics() {
  const { data: popular } = await supabase
    .from('popular_queries')
    .select('*')
    .order('count', { ascending: false })
    .limit(5);

  return popular || [];
}
