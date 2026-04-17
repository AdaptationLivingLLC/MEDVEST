import { NextResponse } from "next/server";
import { createClientFolder, uploadFile } from "@/lib/google-drive";
import {
  ocrDriverLicense,
  ocrInsuranceCard,
  ocrMedicareCard,
  ocrRawText,
} from "@/lib/google-vision";
import {
  upsertContact,
  addTagsToContact,
  createTask,
  createNote,
  ensureCustomFields,
} from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_TOTAL_BYTES = Number(
  process.env.INTAKE_MAX_TOTAL_UPLOAD_BYTES || 20 * 1024 * 1024
);
const MAX_PER_FILE_BYTES = 10 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,20}$/;

const INTAKE_CUSTOM_FIELDS = [
  { name: "Intake Date", dataType: "DATE" as const },
  { name: "Intake Language", dataType: "TEXT" as const },
  { name: "Intake Reason", dataType: "LARGE_TEXT" as const },
  { name: "Drive Folder URL", dataType: "TEXT" as const },
  { name: "Drive Folder Name", dataType: "TEXT" as const },
  { name: "OCR DOB", dataType: "TEXT" as const },
  { name: "OCR License Number", dataType: "TEXT" as const },
  { name: "OCR License Expiration", dataType: "TEXT" as const },
  { name: "OCR License State", dataType: "TEXT" as const },
  { name: "OCR License Sex", dataType: "TEXT" as const },
  { name: "OCR Insurance Carrier", dataType: "TEXT" as const },
  { name: "OCR Insurance Member ID", dataType: "TEXT" as const },
  { name: "OCR Insurance Group", dataType: "TEXT" as const },
  { name: "OCR Insurance Plan Type", dataType: "TEXT" as const },
  { name: "OCR RX BIN", dataType: "TEXT" as const },
  { name: "OCR RX PCN", dataType: "TEXT" as const },
  { name: "OCR Medicare MBI", dataType: "TEXT" as const },
  { name: "OCR Medicare Part A", dataType: "TEXT" as const },
  { name: "OCR Medicare Part B", dataType: "TEXT" as const },
];

function sanitizeFilename(name: string, fallback: string): string {
  const trimmed = (name || fallback)
    .trim()
    .replace(/[\/\\:*?"<>|]/g, "_")
    .slice(0, 120);
  return trimmed || fallback;
}

async function fileToBuffer(file: File): Promise<Buffer> {
  return Buffer.from(await file.arrayBuffer());
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    // Honeypot
    const honey = String(form.get("website") || "").trim();
    if (honey.length > 0) {
      return NextResponse.json({ success: true }, { status: 202 });
    }

    const firstName = String(form.get("firstName") || "").trim().slice(0, 60);
    const lastName = String(form.get("lastName") || "").trim().slice(0, 60);
    const email = String(form.get("email") || "").trim().slice(0, 254);
    const phone = String(form.get("phone") || "").trim().slice(0, 32);
    const dob = String(form.get("dob") || "").trim().slice(0, 20);
    const address1 = String(form.get("address1") || "").trim().slice(0, 120);
    const city = String(form.get("city") || "").trim().slice(0, 60);
    const state = String(form.get("state") || "").trim().slice(0, 4).toUpperCase();
    const postalCode = String(form.get("postalCode") || "")
      .trim()
      .slice(0, 10);
    const locale = String(form.get("locale") || "en") === "es" ? "es" : "en";
    const reason = String(form.get("reason") || "").trim().slice(0, 4000);

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First and last name are required." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Valid email required." },
        { status: 400 }
      );
    }
    if (phone && !PHONE_RE.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number." },
        { status: 400 }
      );
    }

    const licenseFile = form.get("license");
    const insuranceFrontFile = form.get("insuranceFront");
    const insuranceBackFile = form.get("insuranceBack");
    const medicareFile = form.get("medicare");
    const medicalRecords = form.getAll("medicalRecords");

    const allFiles: File[] = [];
    const pushIfFile = (v: FormDataEntryValue | null) => {
      if (v instanceof File && v.size > 0) allFiles.push(v);
    };
    pushIfFile(licenseFile);
    pushIfFile(insuranceFrontFile);
    pushIfFile(insuranceBackFile);
    pushIfFile(medicareFile);
    for (const m of medicalRecords) pushIfFile(m);

    if (!allFiles.length) {
      return NextResponse.json(
        { error: "At least one document is required." },
        { status: 400 }
      );
    }

    let totalBytes = 0;
    for (const f of allFiles) {
      if (f.size > MAX_PER_FILE_BYTES) {
        return NextResponse.json(
          { error: `File "${f.name}" is too large (max 10 MB each).` },
          { status: 413 }
        );
      }
      totalBytes += f.size;
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { error: "Total upload size exceeds limit." },
        { status: 413 }
      );
    }

    // Drive folder
    const { folderId, folderUrl, folderName } = await createClientFolder({
      firstName,
      lastName,
    });

    const uploads: Array<{ label: string; filename: string; fileUrl: string }> = [];
    const uploadFileLabeled = async (file: File, label: string) => {
      const filename = sanitizeFilename(file.name, `${label}-${Date.now()}`);
      const buf = await fileToBuffer(file);
      const { fileUrl } = await uploadFile({
        folderId,
        filename: `${label} - ${filename}`,
        mimeType: file.type || "application/octet-stream",
        buffer: buf,
      });
      uploads.push({ label, filename, fileUrl });
      return buf;
    };

    // OCR buffers captured during upload so we don't re-read the files
    let licenseBuffer: Buffer | null = null;
    let insuranceFrontBuffer: Buffer | null = null;
    let medicareBuffer: Buffer | null = null;

    if (licenseFile instanceof File && licenseFile.size > 0) {
      licenseBuffer = await uploadFileLabeled(licenseFile, "Drivers License");
    }
    if (insuranceFrontFile instanceof File && insuranceFrontFile.size > 0) {
      insuranceFrontBuffer = await uploadFileLabeled(
        insuranceFrontFile,
        "Insurance Card Front"
      );
    }
    if (insuranceBackFile instanceof File && insuranceBackFile.size > 0) {
      await uploadFileLabeled(insuranceBackFile, "Insurance Card Back");
    }
    if (medicareFile instanceof File && medicareFile.size > 0) {
      medicareBuffer = await uploadFileLabeled(medicareFile, "Medicare Card");
    }
    for (let i = 0; i < medicalRecords.length; i++) {
      const m = medicalRecords[i];
      if (m instanceof File && m.size > 0) {
        await uploadFileLabeled(m, `Medical Record ${i + 1}`);
      }
    }

    // OCR verification pass (server-authoritative)
    const ocrData: Record<string, string> = {};
    if (licenseBuffer) {
      try {
        const dl = await ocrDriverLicense(licenseBuffer);
        if (dl.dob) ocrData["OCR DOB"] = dl.dob;
        if (dl.licenseNumber) ocrData["OCR License Number"] = dl.licenseNumber;
        if (dl.expiration)
          ocrData["OCR License Expiration"] = dl.expiration;
        if (dl.state) ocrData["OCR License State"] = dl.state;
        if (dl.sex) ocrData["OCR License Sex"] = dl.sex;
      } catch (e) {
        console.error("License OCR failed:", e);
      }
    }

    if (insuranceFrontBuffer) {
      try {
        const raw = await ocrRawText(insuranceFrontBuffer);
        const upper = raw.toUpperCase();
        const isMedicare =
          upper.includes("MEDICARE HEALTH INSURANCE") ||
          upper.includes("HOSPITAL (PART A)");
        if (isMedicare) {
          const mc = await ocrMedicareCard(insuranceFrontBuffer);
          if (mc.mbi) ocrData["OCR Medicare MBI"] = mc.mbi;
          if (mc.partAEffective)
            ocrData["OCR Medicare Part A"] = mc.partAEffective;
          if (mc.partBEffective)
            ocrData["OCR Medicare Part B"] = mc.partBEffective;
        } else {
          const ic = await ocrInsuranceCard(insuranceFrontBuffer);
          if (ic.carrier) ocrData["OCR Insurance Carrier"] = ic.carrier;
          if (ic.memberId)
            ocrData["OCR Insurance Member ID"] = ic.memberId;
          if (ic.groupNumber)
            ocrData["OCR Insurance Group"] = ic.groupNumber;
          if (ic.planType)
            ocrData["OCR Insurance Plan Type"] = ic.planType;
          if (ic.rxBin) ocrData["OCR RX BIN"] = ic.rxBin;
          if (ic.rxPcn) ocrData["OCR RX PCN"] = ic.rxPcn;
        }
      } catch (e) {
        console.error("Insurance OCR failed:", e);
      }
    }

    if (medicareBuffer) {
      try {
        const mc = await ocrMedicareCard(medicareBuffer);
        if (mc.mbi && !ocrData["OCR Medicare MBI"])
          ocrData["OCR Medicare MBI"] = mc.mbi;
        if (mc.partAEffective && !ocrData["OCR Medicare Part A"])
          ocrData["OCR Medicare Part A"] = mc.partAEffective;
        if (mc.partBEffective && !ocrData["OCR Medicare Part B"])
          ocrData["OCR Medicare Part B"] = mc.partBEffective;
      } catch (e) {
        console.error("Medicare OCR failed:", e);
      }
    }

    // GHL custom fields
    const fieldIds = await ensureCustomFields(INTAKE_CUSTOM_FIELDS);
    const todayIso = new Date().toISOString().slice(0, 10);

    const customFieldPayload: Array<{
      id: string;
      field_value: string;
    }> = [];
    const setField = (name: string, value: string | undefined) => {
      if (!value) return;
      const id = fieldIds[name];
      if (!id) return;
      customFieldPayload.push({ id, field_value: value });
    };
    setField("Intake Date", todayIso);
    setField("Intake Language", locale);
    setField("Intake Reason", reason);
    setField("Drive Folder URL", folderUrl);
    setField("Drive Folder Name", folderName);
    for (const [name, value] of Object.entries(ocrData)) {
      setField(name, value);
    }

    // Upsert contact
    const tags = ["intake-complete", `locale:${locale}`];
    const { contactId, created } = await upsertContact({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      dateOfBirth: dob || ocrData["OCR DOB"] || undefined,
      address1: address1 || undefined,
      city: city || undefined,
      state: state || undefined,
      postalCode: postalCode || undefined,
      source: "website-intake",
      tags,
      customFields: customFieldPayload.length ? customFieldPayload : undefined,
    });

    // Ensure tags land even if upsert dropped them
    await addTagsToContact(contactId, tags);

    // Summary note + follow-up task
    const summaryLines = [
      `[Intake — ${locale.toUpperCase()}] ${folderName}`,
      `Drive: ${folderUrl}`,
      reason ? `Reason: ${reason}` : undefined,
      uploads.length
        ? `Uploads: ${uploads.map((u) => u.label).join(", ")}`
        : undefined,
      Object.keys(ocrData).length
        ? `OCR: ${Object.entries(ocrData)
            .map(([k, v]) => `${k.replace("OCR ", "")}=${v}`)
            .join("; ")}`
        : undefined,
    ].filter(Boolean) as string[];
    await createNote(contactId, summaryLines.join("\n"));

    await createTask(contactId, {
      title: `Review intake for ${firstName} ${lastName}`,
      body: `Intake submitted. Documents uploaded to ${folderUrl}.\n\n${summaryLines.join("\n")}`,
    });

    return NextResponse.json(
      {
        success: true,
        contactId,
        created,
        folderUrl,
        uploads: uploads.map((u) => ({ label: u.label, url: u.fileUrl })),
      },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Intake error:", err);
    const message =
      err instanceof Error ? err.message : "Intake submission failed";
    return NextResponse.json(
      { error: message.slice(0, 300) },
      { status: 500 }
    );
  }
}
