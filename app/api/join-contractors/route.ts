import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name?.toString().trim();
    const email = body.email?.toString().trim();
    const phone = body.phone?.toString().trim();
    const trade = body.trade?.toString().trim();

    if (!name || !email || !phone || !trade) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await pool.query(
      `
      INSERT INTO contractors (name, email, phone, trade)
      VALUES ($1, $2, $3, $4)
      `,
      [name, email, phone, trade]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("JOIN CONTRACTOR ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
