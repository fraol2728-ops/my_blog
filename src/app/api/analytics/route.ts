import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.event || typeof body.event !== "string") {
    return NextResponse.json({ error: "Invalid event payload" }, { status: 400 });
  }

  console.info("[analytics-event]", {
    event: body.event,
    payload: body.payload ?? {},
    timestamp: body.timestamp ?? new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "unknown",
  });

  return NextResponse.json({ ok: true });
}
