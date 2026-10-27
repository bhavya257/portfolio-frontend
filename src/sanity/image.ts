import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { getImageDimensions as getDimensions } from '@sanity/asset-utils'

const projectId = process.env.SANITY_API_PROJECT_ID
const dataset = process.env.SANITY_API_DATASET

export const imageBuilder = projectId && dataset
  ? createImageUrlBuilder({ projectId, dataset })
  : null

export type { SanityImageSource }

export interface ImageTransformOptions {
  width?: number
  height?: number
  square?: boolean
  quality?: number
}

/**
 * Returns an ImageUrlBuilder for fluent chaining.
 */
export function urlFor(source: SanityImageSource) {
  if (!imageBuilder || !source) return null
  return imageBuilder.image(source).auto('format')
}

/**
 * Resolves a Sanity image source to an optimized CDN URL string.
 */
export function urlForImage(
  source: SanityImageSource,
  options: ImageTransformOptions = {}
): string | null {
  const builder = urlFor(source)
  if (!builder) return null

  if (options.square) {
    const size = options.width || options.height || 500
    return builder.width(size).height(size).fit('crop').url()
  }

  let instance = builder
  if (options.width) instance = instance.width(options.width)
  if (options.height) instance = instance.height(options.height)
  if (options.quality) instance = instance.quality(options.quality)

  return instance.url()
}

/**
 * Safely extracts image dimensions using Sanity's official @sanity/asset-utils.
 */
export function getImageDimensions(source: SanityImageSource | null | undefined) {
  if (!source) return undefined
  try {
    return getDimensions(source as Parameters<typeof getDimensions>[0])
  } catch {
    return undefined
  }
}
