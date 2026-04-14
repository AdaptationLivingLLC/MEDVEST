import { NextResponse } from 'next/server';
import { createContact, createOpportunity } from '@/lib/ghl';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      caseType,
      caseDescription,
      injuryDate,
    } = body;

    // Validate required fields
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'firstName and email are required' },
        { status: 400 }
      );
    }

    // Build tags
    const tags = ['website-referral'];
    if (caseType) {
      tags.push(caseType);
    }

    // Create contact in GHL
    const contact = await createContact({
      firstName,
      lastName,
      email,
      phone,
      source: 'website-referral',
      tags,
    });

    const contactId = contact.contact?.id;

    // Create opportunity linked to the contact
    let opportunityId: string | undefined;
    if (contactId) {
      const opportunityName = `${firstName} ${lastName || ''} - ${caseType || 'Referral'}`.trim();
      const opportunity = await createOpportunity({
        name: opportunityName,
        contactId,
        status: 'open',
      });
      opportunityId = opportunity.opportunity?.id;
    }

    return NextResponse.json(
      { success: true, contactId, opportunityId },
      { status: 201 }
    );
  } catch (error) {
    console.error('GHL referral creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create referral. Please try again.' },
      { status: 500 }
    );
  }
}
