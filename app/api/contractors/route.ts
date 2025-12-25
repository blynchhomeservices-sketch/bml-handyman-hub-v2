import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = (body?.name ?? "").toString().trim();
    const phone = (body?.phone ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const service_area = (body?.service_area ?? body?.serviceArea ?? "").toString().trim();
    const skills = (body?.skills ?? body?.services ?? "").toString().trim();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, phone" },
        { status: 400 }
      );
    }

    // Insert into contractors table (common schema)
    await sql`
      INSERT INTO contractors (name, phone, email, service_area, skills, created_at)
      VALUES (${name}, ${phone}, ${email}, ${service_area}, ${skills}, NOW())
    `;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "contractors" });
}
