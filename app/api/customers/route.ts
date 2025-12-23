import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const phoneRaw = body?.phone ?? body?.phoneNumber ?? "";
    const phone = phoneRaw ? phoneRaw.toString().trim() : null;

    // Accept common variations from the form
    const service = (
      body?.service ??
      body?.category ??
      body?.jobType ??
      body?.trade ??
      ""
    )
      .toString()
      .trim();

    const message = (
      body?.message ??
      body?.details ??
      body?.description ??
      body?.notes ??
      ""
    )
      .toString()
      .trim();

    if (!name || !email || !service) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          received: {
            name: !!name,
            email: !!email,
            service: !!service,
          },
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO customers (name, email, phone, service, message)
      VALUES (${name}, ${email}, ${phone}, ${service}, ${message || null})
      RETURNING id;
    `;

    return NextResponse.json(
      { success: true, id: result.rows[0]?.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("CUSTOMER API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
