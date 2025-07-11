import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file || !file.name.endsWith(".docx")) {
    return NextResponse.json(
      { error: "Please upload a valid .docx file" },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  return NextResponse.json({ html: result.value });
}
