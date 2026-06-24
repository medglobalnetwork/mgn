import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const res = await fetch(`${apiUrl}/stats`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!res.ok) {
      throw new Error(`Rust API responded with ${res.status}`);
    }

    const data = await res.json();
    
    // Map snake_case from Rust API to camelCase for frontend
    const mappedData = {
      professionals: data.professionals || 0,
      students: data.students || 0,
      organizations: data.organizations || 0,
      activeJobs: data.active_jobs || 0,
      resources: data.courses || 0,
    };
    
    return NextResponse.json(mappedData);
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({
      professionals: 0,
      students: 0,
      organizations: 0,
      activeJobs: 0,
      resources: 0,
    }, { status: 500 });
  }
}
