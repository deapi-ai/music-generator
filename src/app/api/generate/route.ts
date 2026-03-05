import { NextRequest, NextResponse } from "next/server";

const DEAPI_URL = "https://api.deapi.ai/api/v1/client";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-api-key");
  if (!token) {
    return NextResponse.json({ error: "API key required" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const res = await fetch(`${DEAPI_URL}/txt2music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
