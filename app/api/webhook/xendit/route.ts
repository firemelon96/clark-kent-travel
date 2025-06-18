import { db } from "@/db";
import { bookings } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.status === "PAID") {
    // send an email confirming payment status

    await db.update(bookings).set({
      status: "Paid",
      updatedAt: new Date(),
    });
    console.log(
      `Invoice successfully paid with status ${body.status} and id ${body.id}`,
    );
  }

  return NextResponse.json(
    { message: "Callback received successfully eestong" },
    { status: 200 },
  );
}
