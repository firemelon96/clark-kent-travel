import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log(body);

  if (body.status === "PAID") {
    console.log(
      `Invoice successfully paid with status ${body.status} and id ${body.id}`,
    );
  }

  return NextResponse.json(
    { message: "Callback received successfully" },
    { status: 200 },
  );
}
