import { client } from "@/sanity/lib/client";
import { normalizeLeadPayload, validateLeadPayload } from "@/lib/validation/lead";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  const validation = validateLeadPayload(payload ?? {});
  if (!validation.isValid) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  const normalized = normalizeLeadPayload(payload);

  const createdLead = await client.create({
    _type: "lead",
    ...normalized,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, id: createdLead._id });
}
