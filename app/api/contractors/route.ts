import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

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

    const result = await pool.query(
      `
      INSERT INTO contractors (name, email, phone, trade, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at
      `,
      [name, email, phone || null, trade, message || null]
    );

    return NextResponse.json(
      { ok: true, id: result.rows[0].id, created_at: result.rows[0].created_at },
      { status: 201 }
    );
  } catch (err) {
    console.error("CONTRACTORS POST ERROR:", err);
    return NextResponse.json(
      { error: "Server error saving contractor application" },
      { status: 500 }
    );
  }
}
