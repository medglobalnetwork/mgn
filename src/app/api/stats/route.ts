import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch("http://127.0.0.1:8000/stats", {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!res.ok) {
      throw new Error(`Rust API responded with ${res.status}`);
    }

    const data = await res.json();
    
    // Map snake_case from Rust API to camelCase for frontend
    const mappedData = {
      totalUsers: data.total_users || 0,
      verifiedProfessionals: data.verified_professionals || 0,
      organizations: data.organizations || 0,
      activeJobs: data.active_jobs || 0,
      resources: data.courses || 0, // Using courses as resources
      communityMembers: data.total_users || 0,
    };
    
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Stats API Error:', error);
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
