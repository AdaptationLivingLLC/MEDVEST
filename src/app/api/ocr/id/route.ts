import { NextResponse } from "next/server";
import { ocrDriverLicense } from "@/lib/google-vision";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/heic",
  "image/heif",
  "image/webp",
  "application/pdf",
]);

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large" }, { status: 413 });
    }
    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 415 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fields = await ocrDriverLicense(buffer);

    return NextResponse.json(
      { success: true, fields },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("OCR /id error:", err);
    return NextResponse.json(
      { error: "OCR failed. The photo may be unreadable." },
      { status: 500 }
    );
  }
}
