// =============================================================================
// Medvst — GoHighLevel (GHL) API Client
// Server-side only — uses environment variables for authentication.
// =============================================================================

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_BASE_URL = "https://services.leadconnectorhq.com";

const ghlHeaders = () => ({
  Authorization: `Bearer ${GHL_API_KEY}`,
  "Content-Type": "application/json",
  Version: "2021-07-28",
});

export async function createContact(data: {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  source?: string;
  tags?: string[];
}) {
  const response = await fetch(`${GHL_BASE_URL}/contacts/`, {
    method: "POST",
    headers: ghlHeaders(),
    body: JSON.stringify({ ...data, locationId: GHL_LOCATION_ID }),
  });

  if (!response.ok) {
    throw new Error(`GHL contact error: ${response.status}`);
  }

  return response.json();
}

export async function createOpportunity(data: {
  name: string;
  contactId: string;
  pipelineId?: string;
  status?: string;
}) {
  const response = await fetch(`${GHL_BASE_URL}/opportunities/`, {
    method: "POST",
    headers: ghlHeaders(),
    body: JSON.stringify({ ...data, locationId: GHL_LOCATION_ID }),
  });

  if (!response.ok) {
    throw new Error(`GHL opportunity error: ${response.status}`);
  }

  return response.json();
}

export async function createNote(contactId: string, body: string) {
  if (!contactId || !body.trim()) return null;
  const response = await fetch(
    `${GHL_BASE_URL}/contacts/${contactId}/notes`,
    {
      method: "POST",
      headers: ghlHeaders(),
      body: JSON.stringify({ body: body.slice(0, 5000) }),
    }
  );

  if (!response.ok) return null;
  return response.json();
}
