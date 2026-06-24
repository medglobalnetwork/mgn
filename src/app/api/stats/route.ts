import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';

// Revalidate every 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET() {
  const supabase = getSupabaseServer();

  try {
    // We execute these queries in parallel
    const [
      { count: totalUsers },
      { count: verifiedProfessionals },
      { count: organizations },
      { count: activeJobs },
      { count: resources }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('professional_identities').select('*', { count: 'exact', head: true }).eq('is_verified', true),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('account_type', 'organization'),
      supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'open'),
      supabase.from('courses').select('*', { count: 'exact', head: true })
    ]);

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      verifiedProfessionals: verifiedProfessionals || 0,
      organizations: organizations || 0,
      activeJobs: activeJobs || 0,
      resources: resources || 0,
      communityMembers: totalUsers || 0 // Assuming all users are community members
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({
      totalUsers: 0,
      verifiedProfessionals: 0,
      organizations: 0,
      activeJobs: 0,
      resources: 0,
      communityMembers: 0
    }, { status: 500 });
  }
}
