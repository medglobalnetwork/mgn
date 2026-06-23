import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "MGNCare API",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/api/health",
    },
  });
}
