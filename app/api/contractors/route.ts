import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, trade, city } = body;

    await pool.query(
      `INSERT INTO contractors (name, email, phone, trade, city)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone, trade, city]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contractor insert error:", error);
    return NextResponse.json(
      { error: "Failed to save contractor" },
      { status: 500 }
    );
  }
}
