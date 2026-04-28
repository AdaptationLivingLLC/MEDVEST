// =============================================================================
// Medvst — Google Drive Service Account Client
// Server-side only. Uploads client intake files into Shahpoor's Workspace Drive.
// =============================================================================

import { google, drive_v3 } from "googleapis";
import { JWT } from "google-auth-library";
import { readFileSync } from "fs";
import path from "path";
import { Readable } from "stream";

const SCOPES = ["https://www.googleapis.com/auth/drive"];

let cachedClient: drive_v3.Drive | null = null;
let cachedParentFolderId: string | null = null;

function loadCredentials() {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline && inline.trim().startsWith("{")) {
    return JSON.parse(inline);
  }

  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  if (!keyPath) {
    throw new Error(
      "Missing Google credentials: set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_KEY_PATH"
    );
  }

  const resolved = path.isAbsolute(keyPath)
    ? keyPath
    : path.resolve(process.cwd(), keyPath);
  return JSON.parse(readFileSync(resolved, "utf8"));
}

function driveClient(): drive_v3.Drive {
  if (cachedClient) return cachedClient;

  const creds = loadCredentials();
  const auth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: SCOPES,
  });

  cachedClient = google.drive({ version: "v3", auth });
  return cachedClient;
}

async function resolveParentFolderId(): Promise<string> {
  if (cachedParentFolderId) return cachedParentFolderId;

  const envId = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID;
  if (envId) {
    cachedParentFolderId = envId;
    return envId;
  }

  const folderName =
    process.env.GOOGLE_DRIVE_PARENT_FOLDER_NAME || "Medvst Clients";

  const drive = driveClient();
  const search = await drive.files.list({
    q: `name = '${folderName.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name, owners)",
    pageSize: 5,
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
  });

  const match = search.data.files?.[0];
  if (!match?.id) {
    throw new Error(
      `Drive parent folder "${folderName}" not found. Share the folder with the service account email as Editor.`
    );
  }

  cachedParentFolderId = match.id;
  return match.id;
}

function sanitizeSegment(input: string): string {
  return input.trim().replace(/[\/\\:*?"<>|]/g, "").slice(0, 80) || "Unknown";
}

function todayIso(): string {
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function createClientFolder(params: {
  firstName: string;
  lastName: string;
  intakeDate?: string;
}): Promise<{ folderId: string; folderUrl: string; folderName: string }> {
  const drive = driveClient();
  const parentId = await resolveParentFolderId();

  const last = sanitizeSegment(params.lastName || "Unknown");
  const first = sanitizeSegment(params.firstName || "Unknown");
  const date = params.intakeDate || todayIso();
  const patientFolderName = `${last}, ${first}`;

  const existing = await drive.files.list({
    q: `'${parentId}' in parents and name = '${patientFolderName.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name)",
    pageSize: 1,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  let patientFolderId = existing.data.files?.[0]?.id;

  if (!patientFolderId) {
    const created = await drive.files.create({
      requestBody: {
        name: patientFolderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentId],
      },
      fields: "id",
      supportsAllDrives: true,
    });
    patientFolderId = created.data.id ?? undefined;
  }

  if (!patientFolderId) {
    throw new Error("Failed to create patient folder in Drive");
  }

  const dateFolder = await drive.files.create({
    requestBody: {
      name: `Intake ${date}`,
      mimeType: "application/vnd.google-apps.folder",
      parents: [patientFolderId],
    },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  const folderId = dateFolder.data.id!;
  const folderUrl =
    dateFolder.data.webViewLink ||
    `https://drive.google.com/drive/folders/${folderId}`;

  return { folderId, folderUrl, folderName: patientFolderName };
}

export async function uploadFile(params: {
  folderId: string;
  filename: string;
  mimeType: string;
  buffer: Buffer;
}): Promise<{ fileId: string; fileUrl: string }> {
  const drive = driveClient();

  const res = await drive.files.create({
    requestBody: {
      name: params.filename,
      parents: [params.folderId],
    },
    media: {
      mimeType: params.mimeType,
      body: Readable.from(params.buffer),
    },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  return {
    fileId: res.data.id!,
    fileUrl:
      res.data.webViewLink ||
      `https://drive.google.com/file/d/${res.data.id}/view`,
  };
}
