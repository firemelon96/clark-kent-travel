import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.status === "PAID") {
    await db
      .update(bookings)
      .set({
        status: "Paid",
        updatedAt: new Date(),
      })
      .where(eq(bookings.externalId, body.external_id));

    console.log(
      `Invoice successfully paid with status ${body.status} and id ${body.id}`,
    );
  }

  if (body.status === "EXPIRED") {
    await db
      .update(bookings)
      .set({
        status: "Expired",
        updatedAt: new Date(),
      })
      .where(eq(bookings.externalId, body.external_id));
  }

  return NextResponse.json(
    { message: "Callback received successfully eestong" },
    { status: 200 },
  );
}
