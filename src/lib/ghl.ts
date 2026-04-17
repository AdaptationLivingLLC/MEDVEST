// =============================================================================
// Medvst — GoHighLevel (GHL) API Client
// Server-side only — uses environment variables for authentication.
// =============================================================================

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

const ghlHeaders = (): HeadersInit => ({
  Authorization: `Bearer ${GHL_API_KEY}`,
  "Content-Type": "application/json",
  Version: GHL_VERSION,
  Accept: "application/json",
});

async function ghlFetch(
  pathname: string,
  init: RequestInit = {}
): Promise<Response> {
  return fetch(`${GHL_BASE_URL}${pathname}`, {
    ...init,
    headers: { ...ghlHeaders(), ...(init.headers || {}) },
    cache: "no-store",
  });
}

// -----------------------------------------------------------------------------
// Contacts
// -----------------------------------------------------------------------------

export type ContactInput = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  source?: string;
  tags?: string[];
  customFields?: Array<{ id: string; field_value: string | number | boolean }>;
};

export async function createContact(data: ContactInput) {
  const response = await ghlFetch("/contacts/", {
    method: "POST",
    body: JSON.stringify({ ...data, locationId: GHL_LOCATION_ID }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GHL createContact ${response.status}: ${body.slice(0, 300)}`);
  }

  return response.json();
}

export async function findContactByEmail(email: string) {
  if (!email) return null;
  const url = `/contacts/search/duplicate?locationId=${encodeURIComponent(
    GHL_LOCATION_ID
  )}&email=${encodeURIComponent(email)}`;
  const response = await ghlFetch(url, { method: "GET" });
  if (response.status === 404) return null;
  if (!response.ok) return null;
  const data = await response.json().catch(() => null);
  return data?.contact || null;
}

export async function upsertContact(data: ContactInput): Promise<{
  contactId: string;
  created: boolean;
}> {
  const existing = await findContactByEmail(data.email);
  if (existing?.id) {
    await updateContact(existing.id, data);
    return { contactId: existing.id, created: false };
  }

  const created = await createContact(data);
  const contactId =
    created?.contact?.id || created?.id || created?.contactId;
  if (!contactId) {
    throw new Error(`GHL createContact missing id: ${JSON.stringify(created).slice(0, 200)}`);
  }
  return { contactId, created: true };
}

export async function updateContact(
  contactId: string,
  data: Partial<ContactInput>
) {
  const { ...body } = data;
  const response = await ghlFetch(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const t = await response.text();
    throw new Error(`GHL updateContact ${response.status}: ${t.slice(0, 300)}`);
  }
  return response.json();
}

export async function addTagsToContact(contactId: string, tags: string[]) {
  if (!tags.length) return;
  const response = await ghlFetch(`/contacts/${contactId}/tags`, {
    method: "POST",
    body: JSON.stringify({ tags }),
  });
  if (!response.ok && response.status !== 201) {
    const t = await response.text();
    console.error(`GHL addTags ${response.status}: ${t.slice(0, 300)}`);
  }
}

// -----------------------------------------------------------------------------
// Opportunities
// -----------------------------------------------------------------------------

export async function createOpportunity(data: {
  name: string;
  contactId: string;
  pipelineId?: string;
  pipelineStageId?: string;
  status?: "open" | "won" | "lost" | "abandoned";
  monetaryValue?: number;
}) {
  const response = await ghlFetch("/opportunities/", {
    method: "POST",
    body: JSON.stringify({ ...data, locationId: GHL_LOCATION_ID }),
  });
  if (!response.ok) return null;
  return response.json();
}

// -----------------------------------------------------------------------------
// Notes
// -----------------------------------------------------------------------------

export async function createNote(contactId: string, body: string) {
  if (!contactId || !body.trim()) return null;
  const response = await ghlFetch(`/contacts/${contactId}/notes`, {
    method: "POST",
    body: JSON.stringify({ body: body.slice(0, 5000) }),
  });
  if (!response.ok) return null;
  return response.json();
}

// -----------------------------------------------------------------------------
// Tasks
// -----------------------------------------------------------------------------

export async function createTask(
  contactId: string,
  data: {
    title: string;
    body?: string;
    dueDate?: string;
    assignedTo?: string;
  }
) {
  const dueDate =
    data.dueDate ||
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const response = await ghlFetch(`/contacts/${contactId}/tasks`, {
    method: "POST",
    body: JSON.stringify({
      title: data.title.slice(0, 100),
      body: (data.body || "").slice(0, 5000),
      dueDate,
      completed: false,
      ...(data.assignedTo ? { assignedTo: data.assignedTo } : {}),
    }),
  });

  if (!response.ok) {
    const t = await response.text();
    console.error(`GHL createTask ${response.status}: ${t.slice(0, 300)}`);
    return null;
  }
  return response.json();
}

// -----------------------------------------------------------------------------
// Custom Fields
// -----------------------------------------------------------------------------

export type CustomFieldDef = {
  id: string;
  name: string;
  fieldKey: string;
  dataType: string;
};

let cachedCustomFields: CustomFieldDef[] | null = null;

export async function listCustomFields(): Promise<CustomFieldDef[]> {
  if (cachedCustomFields) return cachedCustomFields;
  const response = await ghlFetch(
    `/locations/${GHL_LOCATION_ID}/customFields`,
    { method: "GET" }
  );
  if (!response.ok) return [];
  const data = await response.json().catch(() => null);
  const fields: CustomFieldDef[] = (data?.customFields || []).map(
    (f: { id: string; name: string; fieldKey: string; dataType: string }) => ({
      id: f.id,
      name: f.name,
      fieldKey: f.fieldKey,
      dataType: f.dataType,
    })
  );
  cachedCustomFields = fields;
  return fields;
}

export async function createCustomField(data: {
  name: string;
  dataType:
    | "TEXT"
    | "LARGE_TEXT"
    | "NUMERICAL"
    | "PHONE"
    | "EMAIL"
    | "DATE"
    | "MONETORY"
    | "TEXTBOX_LIST"
    | "SINGLE_OPTIONS";
  placeholder?: string;
}): Promise<CustomFieldDef | null> {
  const response = await ghlFetch(
    `/locations/${GHL_LOCATION_ID}/customFields`,
    {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        dataType: data.dataType,
        placeholder: data.placeholder || data.name,
        model: "contact",
      }),
    }
  );
  if (!response.ok) {
    const t = await response.text();
    console.error(`GHL createCustomField ${response.status}: ${t.slice(0, 300)}`);
    return null;
  }
  const data2 = await response.json().catch(() => null);
  const created = data2?.customField;
  if (!created) return null;
  cachedCustomFields = null;
  return {
    id: created.id,
    name: created.name,
    fieldKey: created.fieldKey,
    dataType: created.dataType,
  };
}

export async function ensureCustomFields(
  required: Array<{ name: string; dataType: Parameters<typeof createCustomField>[0]["dataType"] }>
): Promise<Record<string, string>> {
  const existing = await listCustomFields();
  const byName = new Map(
    existing.map((f) => [f.name.trim().toLowerCase(), f])
  );

  const result: Record<string, string> = {};

  for (const req of required) {
    const key = req.name.trim().toLowerCase();
    const found = byName.get(key);
    if (found) {
      result[req.name] = found.id;
      continue;
    }
    const created = await createCustomField({
      name: req.name,
      dataType: req.dataType,
    });
    if (created) {
      result[req.name] = created.id;
      byName.set(key, created);
    }
  }

  cachedCustomFields = null;
  return result;
}
