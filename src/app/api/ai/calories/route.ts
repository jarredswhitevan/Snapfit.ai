import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const resolvedApiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
const defaultModel = process.env.AI_MODEL || process.env.OPENAI_MODEL || "gpt-4.1-mini";

function extractFirstJsonObject(text: string): string | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

export async function POST(req: NextRequest) {
  if (!resolvedApiKey) {
    return NextResponse.json(
      { error: "AI is not configured. Set AI_API_KEY (or OPENAI_API_KEY) in your environment." },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const file = form.get("image");
  const notes = (form.get("notes") as string | null) ?? "";

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "Missing image" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = bytes.toString("base64");
  const mime = (file as any).type || "image/jpeg";

  const client = new OpenAI({ apiKey: resolvedApiKey });

  const prompt =
    "Estimate total calories from the food photo. Output ONLY strict JSON with shape: " +
    "{estimatedCalories:number, confidence:number (0-1), items:[{name:string, calories:number}]} " +
    "Assume typical serving sizes unless notes specify otherwise. If unsure, be conservative.";

  try {
    // Use the Responses API for multimodal input
    const res = await client.responses.create({
      model: defaultModel,
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: `${prompt}\nNotes: ${notes}` },
            { type: "input_image", image_url: `data:${mime};base64,${base64}`, detail: "auto" },
          ],
        },
      ],
    });

    const text = (res.output_text ?? "").trim();
    const jsonText = extractFirstJsonObject(text) ?? text;

    try {
      const parsed = JSON.parse(jsonText);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ error: "AI returned non-JSON", raw: text }, { status: 502 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "AI request failed" }, { status: 500 });
  }
}
