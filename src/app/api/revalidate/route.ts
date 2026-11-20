import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { SIGNATURE_HEADER_NAME, isValidSignature } from '@sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME)
    const body = await req.text()
    const secret = process.env.SANITY_API_READ_TOKEN

    if (!signature || !secret || !(await isValidSignature(body, signature, secret))) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    const { _type, _id } = JSON.parse(body) as { _type?: string; _id?: string }

    if (!_type) {
      return new NextResponse('Bad Request: Missing _type', { status: 400 })
    }

    // Invalidate cached data associated with the modified document type
    revalidateTag(_type, { expire: 0 })

    // Invalidate media API cache when an asset or document containing images is modified
    const mediaDocTypes = [
      'sanity.imageAsset',
      'sanity.fileAsset',
      'about',
      'job',
      'project',
      'skill',
      'contact',
    ]

    let mediaRevalidated = false
    if (mediaDocTypes.includes(_type) || _id?.startsWith('image-')) {
      revalidateTag('media', { expire: 0 })
      revalidateTag('media/image', { expire: 0 })
      mediaRevalidated = true

      if (_id?.startsWith('image-')) {
        // Map Sanity asset ID (image-<hash>-<dims>-<ext>) to media path (<hash>-<dims>.<ext>)
        const filename = _id.replace(/^image-/, '').replace(/-([a-z0-9]+)$/, '.$1')
        revalidateTag(filename, { expire: 0 })
      }
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      tag: _type,
      mediaRevalidated,
      now: Date.now(),
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new NextResponse(`Error revalidating: ${message}`, { status: 500 })
  }
}
