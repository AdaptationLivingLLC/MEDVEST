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
export const maxDuration = 300;

const MAX_TOTAL_BYTES = Number(
  process.env.INTAKE_MAX_TOTAL_UPLOAD_BYTES || 95 * 1024 * 1024
);
const MAX_PER_FILE_BYTES = Number(
  process.env.INTAKE_MAX_PER_FILE_BYTES || 95 * 1024 * 1024
);
const PHONE_RE = /^[+\d][\d\s\-().]{6,20}$/;

const INTAKE_CUSTOM_FIELDS = [
  { name: "Intake Date", dataType: "DATE" as const },
  { name: "Intake Language", dataType: "TEXT" as const },
  { name: "Intake Reason", dataType: "LARGE_TEXT" as const },
  { name: "Drive Folder URL", dataType: "TEXT" as const },
  { name: "Drive Folder Name", dataType: "TEXT" as const },
  { name: "HIPAA Authorization Given", dataType: "TEXT" as const },
  { name: "HIPAA Authorization Timestamp", dataType: "TEXT" as const },
  { name: "Contact Opt-In Given", dataType: "TEXT" as const },
  { name: "Contact Opt-In Timestamp", dataType: "TEXT" as const },
  { name: "Consent IP Address", dataType: "TEXT" as const },
  { name: "Consent User Agent", dataType: "TEXT" as const },
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

    const hipaaAuth = String(form.get("hipaaAuth") || "") === "true";
    const contactOptIn = String(form.get("contactOptIn") || "") === "true";
    const consentTimestamp =
      String(form.get("consentTimestamp") || "").trim().slice(0, 40) ||
      new Date().toISOString();
    const consentIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const consentUserAgent = (request.headers.get("user-agent") || "")
      .slice(0, 500);

    // Contact info, HIPAA auth, and contact opt-in are ALL optional. We record
    // them when present so Shahpoor can follow up offline for written consent
    // before processing PHI, but we never block the upload itself. Only a
    // malformed phone number is rejected — if the user typed garbage in the
    // phone field, we cannot create a usable contact record from it.
    if (phone && !PHONE_RE.test(phone)) {
      return NextResponse.json(
        { error: "That phone number does not look valid. Leave it blank if you prefer." },
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
          { error: `File "${f.name}" is too large (max ${Math.floor(MAX_PER_FILE_BYTES / 1024 / 1024)} MB each).` },
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

    // Drive folder. When neither name was provided, generate a unique
    // anonymous folder so multiple no-name uploads do not collide on Drive.
    const isAnonymous = !firstName && !lastName;
    const folderFirstName = firstName || (isAnonymous ? "Anonymous" : "Unknown");
    const folderLastName =
      lastName ||
      (isAnonymous
        ? `Upload-${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}-${Math.random().toString(36).slice(2, 6)}`
        : "Unknown");
    const { folderId, folderUrl, folderName } = await createClientFolder({
      firstName: folderFirstName,
      lastName: folderLastName,
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
    setField("HIPAA Authorization Given", hipaaAuth ? "yes" : "no");
    setField("HIPAA Authorization Timestamp", consentTimestamp);
    setField("Contact Opt-In Given", contactOptIn ? "yes" : "no");
    setField("Contact Opt-In Timestamp", consentTimestamp);
    setField("Consent IP Address", consentIp);
    setField("Consent User Agent", consentUserAgent);
    for (const [name, value] of Object.entries(ocrData)) {
      setField(name, value);
    }

    // GHL contact upsert needs at least one identifier (email or phone). When
    // the visitor uploaded documents anonymously we keep the Drive folder but
    // skip the GHL leg entirely; Shahpoor follows up from the Drive folder.
    const hasIdentifier = Boolean(email || phone);
    let contactId: string | null = null;
    let created = false;

    if (hasIdentifier) {
      const tags = [
        "intake-complete",
        `locale:${locale}`,
        hipaaAuth ? "hipaa-authorized" : "hipaa-not-yet-authorized",
        contactOptIn ? "sms-opt-in" : "no-sms-opt-in",
      ];
      const upsertResult = await upsertContact({
        firstName: firstName || "Walk-In",
        lastName: lastName || "Upload",
        email:
          email ||
          `noemail+${phone.replace(/[^0-9]/g, "") || "anon"}@medvst.local`,
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
      contactId = upsertResult.contactId;
      created = upsertResult.created;

      await addTagsToContact(contactId, tags);

      const displayName =
        [firstName, lastName].filter(Boolean).join(" ") ||
        email ||
        phone ||
        "Anonymous Upload";
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
        `Consent: HIPAA=${hipaaAuth ? "yes" : "no"}, SMS/Email Opt-In=${contactOptIn ? "yes" : "no"} @ ${consentTimestamp} from ${consentIp}`,
        `User-Agent: ${consentUserAgent || "unknown"}`,
      ].filter(Boolean) as string[];
      await createNote(contactId, summaryLines.join("\n"));

      await createTask(contactId, {
        title: `Review intake for ${displayName}`,
        body: `Intake submitted. Documents uploaded to ${folderUrl}.\n\n${summaryLines.join("\n")}${hipaaAuth ? "" : "\n\nNOTE: HIPAA authorization was NOT given on the form. Obtain written authorization before processing PHI."}`,
      });
    } else {
      // Anonymous upload — log the Drive landing so it does not get lost.
      console.log(
        `[Intake] Anonymous upload received. Drive folder: ${folderUrl} (${folderName}). Files: ${uploads.length}. Consent: HIPAA=${hipaaAuth ? "yes" : "no"}, SMS=${contactOptIn ? "yes" : "no"}.`
      );
    }

    return NextResponse.json(
      {
        success: true,
        contactId,
        created,
        anonymous: !hasIdentifier,
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
