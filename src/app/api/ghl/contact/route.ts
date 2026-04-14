import { NextResponse } from 'next/server';
import { createContact } from '@/lib/ghl';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, caseType } = body;

    // Validate required fields
    if (!firstName || !email) {
      return NextResponse.json(
        { error: 'firstName and email are required' },
        { status: 400 }
      );
    }

    // Build tags
    const tags = ['website-contact'];
    if (caseType) {
      tags.push(caseType);
    }

    // Create contact in GHL
    const contact = await createContact({
      firstName,
      lastName,
      email,
      phone,
      source: 'website-contact',
      tags,
    });

    return NextResponse.json(
      { success: true, contactId: contact.contact?.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('GHL contact creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create contact. Please try again.' },
      { status: 500 }
    );
  }
}
