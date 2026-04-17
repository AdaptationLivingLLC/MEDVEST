// =============================================================================
// Medvst — Google Vision OCR + Field Extraction
// Server-side. Parses driver's licenses, insurance cards, and Medicare cards.
// =============================================================================

import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { readFileSync } from "fs";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/cloud-platform"];

let cachedAuth: GoogleAuth | null = null;

function loadCredentials() {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline && inline.trim().startsWith("{")) {
    return JSON.parse(inline);
  }

  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  if (!keyPath) {
    throw new Error("Missing Google credentials for Vision API");
  }

  const resolved = path.isAbsolute(keyPath)
    ? keyPath
    : path.resolve(process.cwd(), keyPath);
  return JSON.parse(readFileSync(resolved, "utf8"));
}

function getAuth(): GoogleAuth {
  if (cachedAuth) return cachedAuth;

  const creds = loadCredentials();
  cachedAuth = new GoogleAuth({
    credentials: {
      client_email: creds.client_email,
      private_key: creds.private_key,
    },
    scopes: SCOPES,
  });
  return cachedAuth;
}

async function detectDocumentText(buffer: Buffer): Promise<string> {
  const vision = google.vision({ version: "v1", auth: getAuth() });
  const res = await vision.images.annotate({
    requestBody: {
      requests: [
        {
          image: { content: buffer.toString("base64") },
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        },
      ],
    },
  });

  const annotation = res.data.responses?.[0]?.fullTextAnnotation;
  return annotation?.text || "";
}

// -----------------------------------------------------------------------------
// Parsers
// -----------------------------------------------------------------------------

export type DriverLicenseFields = {
  firstName?: string;
  lastName?: string;
  dob?: string;
  licenseNumber?: string;
  expiration?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  sex?: string;
};

export type InsuranceFields = {
  carrier?: string;
  memberId?: string;
  memberName?: string;
  groupNumber?: string;
  planType?: string;
  rxBin?: string;
  rxPcn?: string;
  rxGroup?: string;
  effectiveDate?: string;
};

export type MedicareFields = {
  mbi?: string;
  name?: string;
  partAEffective?: string;
  partBEffective?: string;
};

const DATE_RE =
  /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12]\d|3[01])[\/\-](\d{2}|\d{4})\b/;

function normalizeState(value: string): string | undefined {
  const trimmed = value.trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(trimmed)) return trimmed;
  return undefined;
}

export function parseDriverLicense(text: string): DriverLicenseFields {
  const out: DriverLicenseFields = {};
  const upper = text.toUpperCase();
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = /^([A-Z0-9]{1,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const code = match[1];
    const value = match[2].trim();

    switch (code) {
      case "1":
      case "DAB":
        if (!out.lastName) out.lastName = value.replace(/,/g, "").trim();
        break;
      case "2":
      case "DAC":
        if (!out.firstName) out.firstName = value.trim();
        break;
      case "3":
      case "DAD":
        break;
      case "4D":
      case "DAQ":
        if (!out.licenseNumber) out.licenseNumber = value.trim();
        break;
      case "4B":
      case "DBA":
        if (!out.expiration && DATE_RE.test(value))
          out.expiration = DATE_RE.exec(value)![0];
        break;
      case "DBB":
        if (!out.dob && DATE_RE.test(value))
          out.dob = DATE_RE.exec(value)![0];
        break;
      case "DBC":
        if (!out.sex) out.sex = value.trim();
        break;
      case "8":
      case "DAG":
        if (!out.address) out.address = value.trim();
        break;
      case "DAI":
        if (!out.city) out.city = value.trim();
        break;
      case "DAJ":
        if (!out.state) out.state = normalizeState(value);
        break;
      case "DAK":
        if (!out.postalCode) out.postalCode = value.replace(/\D/g, "").slice(0, 5);
        break;
    }
  }

  if (!out.dob) {
    const dobLabel =
      /(?:DOB|DATE OF BIRTH|BIRTH)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i.exec(
        text
      );
    if (dobLabel) out.dob = dobLabel[1];
  }

  if (!out.expiration) {
    const expLabel =
      /(?:EXP|EXPIRES|EXPIRATION)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i.exec(
        text
      );
    if (expLabel) out.expiration = expLabel[1];
  }

  if (!out.licenseNumber) {
    const lnLabel =
      /(?:DL|LIC(?:ENSE)?\s*(?:NO|NUMBER|#))\s*[:\-]?\s*([A-Z0-9]{5,20})/i.exec(
        text
      );
    if (lnLabel) out.licenseNumber = lnLabel[1];
  }

  if (!out.firstName || !out.lastName) {
    const fn =
      /(?:FN|FIRST\s*NAME|GIVEN\s*NAME)\s*[:\-]?\s*([A-Z][A-Z'\-\s]+)/i.exec(
        text
      );
    const ln =
      /(?:LN|LAST\s*NAME|FAMILY\s*NAME|SURNAME)\s*[:\-]?\s*([A-Z][A-Z'\-\s]+)/i.exec(
        text
      );
    if (fn && !out.firstName) out.firstName = fn[1].trim().split(/\s+/)[0];
    if (ln && !out.lastName) out.lastName = ln[1].trim().split(/\s+/)[0];
  }

  if (!out.postalCode) {
    const zip = /\b(\d{5})(?:-\d{4})?\b/.exec(text);
    if (zip) out.postalCode = zip[1];
  }

  if (!out.state) {
    const stateGuess = /\b([A-Z]{2})\s+\d{5}/.exec(upper);
    if (stateGuess) out.state = stateGuess[1];
  }

  return out;
}

export function parseInsuranceCard(text: string): InsuranceFields {
  const out: InsuranceFields = {};
  const clean = text.replace(/\s+/g, " ");

  const carriers = [
    "AETNA",
    "ANTHEM",
    "BLUE CROSS",
    "BLUE SHIELD",
    "BLUECROSS BLUESHIELD",
    "CIGNA",
    "HUMANA",
    "KAISER",
    "UNITED HEALTHCARE",
    "UNITEDHEALTHCARE",
    "UHC",
    "MOLINA",
    "CENTENE",
    "WELLCARE",
    "AMBETTER",
    "MEDICARE",
    "MEDICAID",
    "TRICARE",
    "VA",
    "HEALTH NET",
    "OSCAR",
  ];
  const upper = clean.toUpperCase();
  for (const c of carriers) {
    if (upper.includes(c)) {
      out.carrier = c.replace(/\s+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
      break;
    }
  }

  const memberId =
    /(?:MEMBER\s*(?:ID|#|NO)|ID\s*(?:#|NO|NUMBER)|SUBSCRIBER\s*ID)\s*[:\-]?\s*([A-Z0-9]{6,20})/i.exec(
      text
    );
  if (memberId) out.memberId = memberId[1].toUpperCase();

  const group =
    /(?:GROUP\s*(?:#|NO|NUMBER)?)\s*[:\-]?\s*([A-Z0-9]{4,15})/i.exec(text);
  if (group) out.groupNumber = group[1].toUpperCase();

  const plan = /(HMO|PPO|EPO|POS|HDHP|HSA|DHMO|PPO PLUS|INDEMNITY)\b/i.exec(
    text
  );
  if (plan) out.planType = plan[1].toUpperCase();

  const bin = /(?:RX\s*BIN|BIN)\s*[:\-]?\s*(\d{6})/i.exec(text);
  if (bin) out.rxBin = bin[1];

  const pcn = /(?:RX\s*PCN|PCN)\s*[:\-]?\s*([A-Z0-9]{3,15})/i.exec(text);
  if (pcn) out.rxPcn = pcn[1].toUpperCase();

  const rxGrp = /RX\s*GRP\s*[:\-]?\s*([A-Z0-9]{3,15})/i.exec(text);
  if (rxGrp) out.rxGroup = rxGrp[1].toUpperCase();

  const eff = /(?:EFFECTIVE|EFF)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i.exec(
    text
  );
  if (eff) out.effectiveDate = eff[1];

  const memberName =
    /(?:MEMBER|NAME|SUBSCRIBER)\s*[:\-]?\s*([A-Z][A-Z\s,'\-]{4,50})/i.exec(text);
  if (memberName && !/(ID|NUMBER|GROUP|PLAN)/i.test(memberName[1])) {
    out.memberName = memberName[1].trim().replace(/\s{2,}/g, " ");
  }

  return out;
}

export function parseMedicareCard(text: string): MedicareFields {
  const out: MedicareFields = {};

  const mbi =
    /\b([1-9A-Z](?![SLOIBZ])[A-Z0-9]{3}-?[A-Z0-9]{2}-?[A-Z0-9]{4})\b/i.exec(
      text
    );
  if (mbi) out.mbi = mbi[1].replace(/-/g, "").toUpperCase();

  const name =
    /(?:NAME|NAME OF BENEFICIARY)\s*[:\-]?\s*([A-Z][A-Z\s,'\-]{4,50})/i.exec(
      text
    );
  if (name) out.name = name[1].trim();

  const partA =
    /HOSPITAL\s*\(PART\s*A\)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i.exec(
      text
    );
  if (partA) out.partAEffective = partA[1];

  const partB =
    /MEDICAL\s*\(PART\s*B\)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i.exec(
      text
    );
  if (partB) out.partBEffective = partB[1];

  return out;
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export async function ocrDriverLicense(
  buffer: Buffer
): Promise<DriverLicenseFields> {
  const text = await detectDocumentText(buffer);
  return parseDriverLicense(text);
}

export async function ocrInsuranceCard(
  buffer: Buffer
): Promise<InsuranceFields> {
  const text = await detectDocumentText(buffer);
  return parseInsuranceCard(text);
}

export async function ocrMedicareCard(
  buffer: Buffer
): Promise<MedicareFields> {
  const text = await detectDocumentText(buffer);
  return parseMedicareCard(text);
}

export async function ocrRawText(buffer: Buffer): Promise<string> {
  return detectDocumentText(buffer);
}
