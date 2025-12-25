import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
  } catch (error) {
    console.error("JOIN CONTRACTOR ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
