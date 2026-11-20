import { getImageDimensions as getDimensions } from "@sanity/asset-utils";
import type { SanityImageCrop, SanityImageHotspot } from "./sanity.types";
import {
  getAssetId,
  resolveImageFilename,
  calculateCropRect,
  calculateFocalPoint,
  buildImageQueryParams,
} from "./imageUtils";

export type SanityImageSource =
  | string
  | {
      _id?: string;
      _ref?: string;
      asset?: {
        _ref?: string;
        _id?: string;
        [key: string]: unknown;
      } | null;
      crop?: SanityImageCrop | null;
      hotspot?: SanityImageHotspot | null;
      [key: string]: unknown;
    }
  | null
  | undefined;

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  square?: boolean;
  quality?: number;
}

/**
 * Resolves intrinsic image dimensions (width, height, aspectRatio) from a Sanity asset reference.
 */
export function getImageDimensions(source: SanityImageSource) {
  if (!source) return undefined;
  try {
    return getDimensions(source as Parameters<typeof getDimensions>[0]);
  } catch {
    return undefined;
  }
}

/**
 * Resolves a Sanity image asset into a server-proxied URL (/api/media/image/...)
 * with dimension, crop, and format parameters applied directly.
 */
export function urlForImage(
  source: SanityImageSource,
  options: ImageTransformOptions = {}
): string | null {
  const assetId = getAssetId(source);
  if (!assetId) return null;

  const filename = resolveImageFilename(assetId);
  if (!filename) return null;

  const dimensions = getImageDimensions(source);
  const crop = typeof source === "object" ? source?.crop : null;
  const hotspot = typeof source === "object" ? source?.hotspot : null;
  const cropRect = calculateCropRect(crop, dimensions);
  const focalPoint = calculateFocalPoint(hotspot, crop);
  const searchParams = buildImageQueryParams(options, cropRect, focalPoint);

  return `/api/media/image/${filename}?${searchParams.toString()}`;
}
