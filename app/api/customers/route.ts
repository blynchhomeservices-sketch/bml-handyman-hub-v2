import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      address,
      service,
      notes
    } = body;

    await sql`
      INSERT INTO customers (
        name,
        email,
        phone,
        address,
        service,
        notes
      )
      VALUES (
        ${name},
        ${email},
        ${phone},
        ${address},
        ${service},
        ${notes}
      );
    `;

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Customer insert error:', error);

    return new Response(
      JSON.stringify({ success: false }),
      { status: 500 }
    );
  }
}
