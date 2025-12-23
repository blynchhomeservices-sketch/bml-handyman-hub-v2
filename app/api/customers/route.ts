import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL || "", {
  ssl: "require",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Accept multiple possible field names (so your form can vary and still work)
    const name = (body?.name ?? body?.fullName ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const phone = (body?.phone ?? body?.phoneNumber ?? "").toString().trim();

    // service/trade/category - accept any of these
    const service = (
      body?.service ??
      body?.trade ??
      body?.category ??
      ""
    )
      .toString()
      .trim();

    const message = (body?.message ?? body?.details ?? "").toString().trim();

    // Basic validation (this is likely why you’re getting POST 400 right now)
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["name", "email", "phone", "service"],
          received: { name, email, phone, service, message },
        },
        { status: 400 }
      );
    }

    // Insert into Neon customers table
    const result = await sql`
      INSERT INTO customers (name, email, phone, service, message)
      VALUES (${name}, ${email}, ${phone}, ${service}, ${message})
      RETURNING id, name, email, phone, service, message, created_at
    `;

    return NextResponse.json(
      { ok: true, customer: result[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("CUSTOMERS_API_ERROR:", error);
    return NextResponse.json(
      {
        error: "Server error",
        detail: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
