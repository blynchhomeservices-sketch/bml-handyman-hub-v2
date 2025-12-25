import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = (body?.name ?? "").toString().trim();
    const phone = (body?.phone ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const address = (body?.address ?? "").toString().trim();
    const service = (body?.service ?? "").toString().trim();
    const details = (body?.details ?? body?.message ?? "").toString().trim();

    // Basic validation (doesn't block you from testing quickly)
    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, phone" },
        { status: 400 }
      );
    }

    // Insert into customers table (common schema)
    await sql`
      INSERT INTO customers (name, phone, email, address, service, details, created_at)
      VALUES (${name}, ${phone}, ${email}, ${address}, ${service}, ${details}, NOW())
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
  // Quick health check endpoint
  return NextResponse.json({ ok: true, route: "customers" });
}
