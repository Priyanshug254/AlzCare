import { NextResponse } from 'next/server'

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('image')

  if (!file || !file.name) {
    return NextResponse.json({ prediction: 'No image provided.' }, { status: 400 })
  }

  // Get original filename
  const filename = file.name.toLowerCase()

  let prediction = 'Unknown'

  // Simulate ML prediction based on filename
  if (filename.includes('mri1')) {
    prediction = 'Early Stage Alzheimer’s'
  } else if (filename.includes('mri2')) {
    prediction = 'Mild Stage Alzheimer’s'
  } else if (filename.includes('mri3')) {
    prediction = 'Moderate Stage Alzheimer’s'
  } else if (filename.includes('mri4')) {
    prediction = 'Severe Stage Alzheimer’s'
  }

  return NextResponse.json({ prediction })
}
