import { NextResponse } from "next/server";
import {
  ocrInsuranceCard,
  ocrMedicareCard,
  ocrRawText,
} from "@/lib/google-vision";

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

function looksLikeMedicare(text: string): boolean {
  const upper = text.toUpperCase();
  return (
    upper.includes("MEDICARE HEALTH INSURANCE") ||
    upper.includes("HOSPITAL (PART A)") ||
    upper.includes("MEDICAL (PART B)") ||
    /\b[1-9A-Z](?![SLOIBZ])[A-Z0-9]{3}-?[A-Z0-9]{2}-?[A-Z0-9]{4}\b/.test(upper)
  );
}

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
    const rawText = await ocrRawText(buffer);

    if (looksLikeMedicare(rawText)) {
      const medicare = await ocrMedicareCard(buffer);
      return NextResponse.json(
        { success: true, cardType: "medicare", fields: medicare },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const insurance = await ocrInsuranceCard(buffer);
    return NextResponse.json(
      { success: true, cardType: "insurance", fields: insurance },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("OCR /insurance error:", err);
    return NextResponse.json(
      { error: "OCR failed. The photo may be unreadable." },
      { status: 500 }
    );
  }
}
