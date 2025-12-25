import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, address, details } = body;

    await pool.query(
      `INSERT INTO customers (name, email, phone, service, address, details)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, email, phone, service, address, details]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Customer insert error:", error);
    return NextResponse.json(
      { error: "Failed to save customer request" },
      { status: 500 }
    );
  }
}
