import type { ImageContent, SanityImageAssetReference } from './sanity.types'

export type SanityImageSource =
  | ImageContent
  | SanityImageAssetReference
  | { _ref?: string; _id?: string; url?: string; asset?: { _ref?: string; _id?: string; url?: string } }
  | string
  | undefined

export interface ImageTransformOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  direct?: boolean // If true, returns direct cdn.sanity.io url instead of /media rewrite
}

export interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
}

export interface ParsedSanityImage {
  assetId?: string
  dimensions?: ImageDimensions
  format?: string
  filename?: string
}

const SANITY_IMAGE_PATTERN = /^image-([a-f0-9]+)-(\d+x\d+)-([a-z0-9]+)$/

/**
 * Extracts the asset reference string, ID, or URL from various source formats.
 */
function extractRef(source: SanityImageSource): string | undefined {
  if (!source) return undefined
  if (typeof source === 'string') return source

  if ('asset' in source && source.asset) {
    const asset = source.asset as Record<string, unknown>
    return (asset._ref as string) || (asset._id as string) || (asset.url as string) || undefined
  }

  if ('_ref' in source && source._ref) return source._ref
  if ('_id' in source && source._id) return source._id
  if ('url' in source && source.url) return source.url

  return undefined
}

/**
 * Calculates dimensions and aspect ratio.
 */
function createDimensions(width: number, height: number): ImageDimensions {
  return {
    width,
    height,
    aspectRatio: width / height,
  }
}

/**
 * Parses direct CDN URLs (e.g. https://cdn.sanity.io/images/.../assetId-1200x800.jpg).
 */
function parseCdnUrl(url: string): ParsedSanityImage {
  const parts = url.split('/')
  const filename = parts[parts.length - 1]
  const [name, format] = filename.split('.')
  const dimMatch = name.match(/-(\d+)x(\d+)$/)

  if (!dimMatch) {
    return { filename }
  }

  const width = parseInt(dimMatch[1], 10)
  const height = parseInt(dimMatch[2], 10)

  return {
    dimensions: createDimensions(width, height),
    format,
    filename,
  }
}

/**
 * Parses standard Sanity asset reference identifiers (e.g. image-assetId-1200x800-jpg).
 */
function parseAssetPattern(ref: string): ParsedSanityImage {
  const match = ref.match(SANITY_IMAGE_PATTERN)
  if (!match) return {}

  const [, assetId, dimensionsStr, format] = match
  const [widthStr, heightStr] = dimensionsStr.split('x')
  const width = parseInt(widthStr, 10)
  const height = parseInt(heightStr, 10)
  const filename = `${assetId}-${width}x${height}.${format}`

  return {
    assetId,
    dimensions: createDimensions(width, height),
    format,
    filename,
  }
}

/**
 * Extracts dimensions and asset path from a Sanity image object or asset ref.
 */
export function parseSanityImage(source: SanityImageSource): ParsedSanityImage {
  const ref = extractRef(source)
  if (!ref) return {}

  if (ref.includes('cdn.sanity.io/images/')) {
    return parseCdnUrl(ref)
  }

  return parseAssetPattern(ref)
}

/**
 * Serializes image transformation options into a URL query string.
 */
function buildTransformQuery(options: ImageTransformOptions): string {
  const params = new URLSearchParams()
  if (options.width) params.set('w', options.width.toString())
  if (options.height) params.set('h', options.height.toString())
  if (options.quality) params.set('q', options.quality.toString())
  if (options.fit) params.set('fit', options.fit)
  params.set('auto', 'format')

  const query = params.toString()
  return query ? `?${query}` : ''
}

/**
 * Resolves either the direct Sanity CDN URL or the local rewrite endpoint.
 */
function resolveImageUrl(
  filename: string,
  queryString: string,
  direct?: boolean
): string | null {
  if (direct) {
    const projectId = process.env.SANITY_API_PROJECT_ID
    const dataset = process.env.SANITY_API_DATASET
    if (!projectId || !dataset) return null

    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}${queryString}`
  }

  return `/media/${filename}${queryString}`
}

/**
 * Builds a relative /media URL (or direct CDN URL) for Sanity images.
 * Keeps media requests routed through the Next.js rewrite according to stack decisions.
 */
export function urlForImage(
  source: SanityImageSource,
  options: ImageTransformOptions = {}
): string | null {
  const { filename } = parseSanityImage(source)
  if (!filename) return null

  const queryString = buildTransformQuery(options)
  return resolveImageUrl(filename, queryString, options.direct)
}
