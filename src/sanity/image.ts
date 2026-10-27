import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { getImageDimensions as getDimensions } from "@sanity/asset-utils";

const projectId = process.env.SANITY_API_PROJECT_ID;
const dataset = process.env.SANITY_API_DATASET;

// Cached Sanity image builder instance
export const imageBuilder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export type { SanityImageSource };

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  square?: boolean;
  quality?: number;
}

/**
 * Returns a fluent Sanity ImageUrlBuilder configured with automatic modern format negotiation (WebP/AVIF).
 */
export function urlFor(source: SanityImageSource) {
  if (!imageBuilder || !source) return null;
  return imageBuilder.image(source).auto("format");
}

/**
 * Resolves a Sanity image asset into an optimized CDN URL string with optional sizing and quality transforms.
 */
export function urlForImage(
  source: SanityImageSource,
  options: ImageTransformOptions = {}
): string | null {
  const builder = urlFor(source);
  if (!builder) return null;

  if (options.square) {
    const size = options.width || options.height || 500;
    return builder.width(size).height(size).fit("crop").url();
  }

  let image = builder;
  if (options.width) image = image.width(options.width);
  if (options.height) image = image.height(options.height);
  if (options.quality) image = image.quality(options.quality);

  return image.url();
}

/**
 * Extracts intrinsic dimensions (width, height, aspectRatio) from a Sanity asset reference to prevent layout shift.
 */
export function getImageDimensions(source: SanityImageSource | null | undefined) {
  if (!source) return undefined;
  try {
    return getDimensions(source as Parameters<typeof getDimensions>[0]);
  } catch {
    return undefined;
  }
}
