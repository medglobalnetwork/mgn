"use server";

import { getSupabaseServer } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export interface ProfileData {
  id: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  avatar_url: string | null;
  primary_category: string | null;
}

export interface ExperienceData {
  id: string;
  company_name: string;
  title: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
}

export interface EducationData {
  id: string;
  institution_name: string;
  degree: string | null;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
}

export async function getUserProfile(userId: string) {
  const supabase = getSupabaseServer();
  
  if (!userId) return null;

  // Fetch basic profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, headline, bio, city, country, avatar_url, primary_category")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    console.error("Error fetching profile:", profileError);
    return null;
  }

  // Fetch experience
  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false });

  // Fetch education
  const { data: education } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false });

  return {
    ...profile,
    experience: (experience || []) as ExperienceData[],
    education: (education || []) as EducationData[],
  };
}

export async function updateProfileInfo(userId: string, data: Partial<ProfileData>) {
  const supabase = getSupabaseServer();
  
  if (!userId) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("profiles")
    .update({
      headline: data.headline,
      bio: data.bio,
      city: data.city,
      country: data.country,
    })
    .eq("id", userId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/settings");
}

export async function addExperience(userId: string, data: Omit<ExperienceData, "id">) {
  const supabase = getSupabaseServer();
  if (!userId) throw new Error("Unauthorized");

  const { error } = await supabase.from("experience").insert({ ...data, user_id: userId });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/settings");
}

export async function deleteExperience(userId: string, expId: string) {
  const supabase = getSupabaseServer();
  if (!userId) throw new Error("Unauthorized");

  const { error } = await supabase.from("experience").delete().eq("id", expId).eq("user_id", userId);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/settings");
}

export async function addEducation(userId: string, data: Omit<EducationData, "id">) {
  const supabase = getSupabaseServer();
  if (!userId) throw new Error("Unauthorized");

  const { error } = await supabase.from("education").insert({ ...data, user_id: userId });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/settings");
}

export async function deleteEducation(userId: string, eduId: string) {
  const supabase = getSupabaseServer();
  if (!userId) throw new Error("Unauthorized");

  const { error } = await supabase.from("education").delete().eq("id", eduId).eq("user_id", userId);
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/settings");
}
