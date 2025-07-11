import { NextRequest, NextResponse } from "next/server";
import htmlDocx from "html-docx-js";

export async function POST(request: NextRequest) {
  const { html, fileName } = await request.json();

  if (!html) {
    return NextResponse.json(
      { error: "HTML content is required" },
      { status: 400 }
    );
  }

  const docx = htmlDocx.asBlob(html);
  const headers = {
    "Content-Disposition": `attachment; filename="${fileName}"`,
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  return new NextResponse(docx, { headers });
}
