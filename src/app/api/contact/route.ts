// src/app/api/contact/route.ts

import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Contact } from '@/models/Contact'

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON data from the body
    const { name, email, subject, message } = await req.json()

    // Validate the fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Connect to the database
    await connectToDatabase()

    // Save to MongoDB (or any other database)
    const contact = await Contact.create({ name, email, subject, message })

    // Respond with success
    return NextResponse.json({ success: true, contact }, { status: 200 })
  } catch (error) {
    console.error('Error handling contact form:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

// You can also handle other methods (GET, PUT, etc.) here if needed, but for now, POST is enough for the contact form.
