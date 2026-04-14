// =============================================================================
// MED VEST — GoHighLevel (GHL) API Client
// Server-side only — uses environment variables for authentication
// =============================================================================

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

export async function createContact(data: {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  source?: string;
  tags?: string[];
}) {
  const response = await fetch(`${GHL_BASE_URL}/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify({
      ...data,
      locationId: GHL_LOCATION_ID,
    }),
  });

  if (!response.ok) {
    throw new Error(`GHL API error: ${response.status}`);
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
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify({
      ...data,
      locationId: GHL_LOCATION_ID,
    }),
  });

  if (!response.ok) {
    throw new Error(`GHL API error: ${response.status}`);
  }

  return response.json();
}
