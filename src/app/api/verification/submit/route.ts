import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    
    const res = await fetch(`${apiUrl}/verification/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: 400 });
    }
  } catch (error) {
    console.error('Verification submit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
