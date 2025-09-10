// app/api/gemini/route.js (for Next.js App Router)
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectTitle, projectType, projectDescription, inputMessage } =
    await req.json();
  const apiKey = process.env.GEMINI_API_KEY; // Securely accessed on server
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"; // Updated model from your curl

  if (!apiKey) {
    return NextResponse.json(
      { content: "Server configuration error: Missing Gemini API key." },
      { status: 500 }
    );
  }

  const context = `Project Title: ${projectTitle}\nProject Type: ${projectType}\nProject Description: ${projectDescription}\nUser Message: ${inputMessage}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      } as Record<string, string>,
      body: JSON.stringify({
        contents: [{ parts: [{ text: context }] }],
      }),
    });
    console.log("reached here");
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiContent =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";
    return NextResponse.json({ content: aiContent });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { content: "Error connecting to Gemini API." },
      { status: 500 }
    );
  }
}
