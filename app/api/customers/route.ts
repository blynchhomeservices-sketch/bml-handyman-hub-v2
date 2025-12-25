import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.toString().trim();
    const email = body.email?.toString().trim();
    const phone = body.phone?.toString().trim();
    const service = body.service?.toString().trim();
    const message = body.message?.toString().trim() || null;

    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await pool.query(
      `
      INSERT INTO customers (name, email, phone, service, message)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [name, email, phone, service, message]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CUSTOMERS API ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
