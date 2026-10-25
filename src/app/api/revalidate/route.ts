import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { SIGNATURE_HEADER_NAME, isValidSignature } from '@sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME)
    const body = await req.text()
    const secret =
      process.env.SANITY_REVALIDATE_SECRET || process.env.SANITY_STUDIO_REVALIDATE_SECRET

    if (!signature || !secret || !(await isValidSignature(body, signature, secret))) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    const { _type } = JSON.parse(body) as { _type?: string }

    if (!_type) {
      return new NextResponse('Bad Request: Missing _type', { status: 400 })
    }

    // Invalidate cached data associated with the modified document type
    revalidateTag(_type, { expire: 0 })

    return NextResponse.json({
      status: 200,
      revalidated: true,
      tag: _type,
      now: Date.now(),
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new NextResponse(`Error revalidating: ${message}`, { status: 500 })
  }
}
