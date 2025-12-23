import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body?.name?.toString().trim();
    const email = body?.email?.toString().trim();
    const phone = body?.phone?.toString().trim();
    const trade = body?.trade?.toString().trim();

    if (!name || !email || !trade) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO contractors (name, email, phone, trade)
      VALUES (${name}, ${email}, ${phone || null}, ${trade})
      RETURNING id;
    `;

    return NextResponse.json(
      { success: true, id: result.rows[0]?.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTRACTOR API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
