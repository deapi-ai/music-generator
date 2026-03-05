import { NextRequest, NextResponse } from "next/server";

const DEAPI_URL = "https://api.deapi.ai/api/v1/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = req.headers.get("x-api-key");
  if (!token) {
    return NextResponse.json({ error: "API key required" }, { status: 401 });
  }

  try {
    const res = await fetch(`${DEAPI_URL}/request-status/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Status check failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
