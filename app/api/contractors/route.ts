import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, trade, message } = body;

    if (!name || !email || !trade) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO contractors (name, email, phone, trade, message)
      VALUES (${name}, ${email}, ${phone || null}, ${trade}, ${message || null})
      RETURNING id, created_at;
    `;

    return NextResponse.json(
      { ok: true, id: result.rows[0].id, created_at: result.rows[0].created_at },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("CONTRACTORS POST ERROR:", err);
    return NextResponse.json(
      { error: "Server error saving contractor request" },
      { status: 500 }
    );
  }
}
