import { NextResponse } from "next/server";

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

    // For now we just log it (later this can go to DB, email, etc.)
    console.log("New customer request:", {
      name,
      email,
      phone,
      service,
      message,
    });

    return NextResponse.json(
      { success: true, message: "Customer request received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Customer API error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
