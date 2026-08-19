import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Grammar check not yet implemented" }, { status: 501 });
}
