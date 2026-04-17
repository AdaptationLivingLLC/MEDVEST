import { NextResponse } from "next/server";
import { createContact, createNote } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_CASE_TYPES = new Set([
  "msa-administration",
  "lien-resolution",
  "settlement-consulting",
  "trust-services",
  "liability-settlements",
  "other",
  "",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,20}$/;
const ALLOWED_ORIGINS = new Set([
  "https://medvst.com",
  "https://www.medvst.com",
]);

const MAX_BODY_BYTES = 16 * 1024;

const hits = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 8;
const RATE_WINDOW_MS = 60_000;

function throttle(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function splitName(full: string): { firstName: string; lastName?: string } {
  const trimmed = full.trim().slice(0, 120);
  if (!trimmed) return { firstName: "" };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin") ?? "";
    const referer = request.headers.get("referer") ?? "";
    const originOk =
      ALLOWED_ORIGINS.has(origin) ||
      Array.from(ALLOWED_ORIGINS).some((o) => referer.startsWith(o));
    if (process.env.NODE_ENV === "production" && !originOk) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!throttle(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Honeypot — bots fill every field. Real users never see "website".
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 202 });
    }

    let firstName: string = typeof body.firstName === "string" ? body.firstName : "";
    let lastName: string | undefined =
      typeof body.lastName === "string" ? body.lastName : undefined;
    if ((!firstName || firstName.trim().length === 0) && typeof body.name === "string") {
      const split = splitName(body.name);
      firstName = split.firstName;
      lastName = split.lastName;
    }
    firstName = firstName.trim().slice(0, 60);
    lastName = lastName?.trim().slice(0, 60);

    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 32) : "";
    const caseType = typeof body.caseType === "string" ? body.caseType.trim().slice(0, 48) : "";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";
    const locale = body.locale === "es" ? "es" : "en";

    if (!firstName) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (phone && !PHONE_RE.test(phone)) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }
    if (!ALLOWED_CASE_TYPES.has(caseType)) {
      return NextResponse.json({ error: "Invalid case type" }, { status: 400 });
    }

    const tags = ["website-contact", `locale:${locale}`];
    if (caseType && caseType !== "other") tags.push(caseType);

    const contactResult = await createContact({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      source: "website-contact",
      tags,
    });

    const contactId: string | undefined = contactResult?.contact?.id;

    if (contactId && message) {
      const prefix = locale === "es" ? "Formulario de contacto" : "Contact form";
      const caseLabel = caseType ? ` — ${caseType}` : "";
      await createNote(contactId, `[${prefix}${caseLabel}]\n\n${message}`);
    }

    return NextResponse.json(
      { success: true, contactId },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("GHL contact creation error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
