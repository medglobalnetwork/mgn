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
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({
      total_users: 0,
      verified_professionals: 0,
      organizations: 0,
      active_jobs: 0,
      courses: 0
    }, { status: 500 });
  }
}
