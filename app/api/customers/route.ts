import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO customers (name, email, phone, service, message)
      VALUES (
        ${name},
        ${email},
        ${phone || null},
        ${service},
        ${message || null}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CUSTOMER API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
