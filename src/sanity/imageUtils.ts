import {
  parseImageAssetId,
  isImageAssetFilename,
} from "@sanity/asset-utils";
import type { SanityImageCrop, SanityImageHotspot } from "./sanity.types";
import type { ImageTransformOptions } from "./image";

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * Extracts the Sanity asset ID from various image source formats.
 */
export function getAssetId(source: unknown): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  if (typeof source === "object") {
    const obj = source as {
      _id?: string;
      _ref?: string;
      asset?: { _ref?: string; _id?: string };
    };
    return obj.asset?._ref || obj.asset?._id || obj._id || obj._ref || null;
  }
  return null;
}

/**
 * Resolves a Sanity asset ID into a CDN-compatible image filename (<hash>-<dims>.<ext>).
 */
export function resolveImageFilename(assetId: string): string | null {
  if (isImageAssetFilename(assetId)) {
    return assetId;
  }
  try {
    const parsed = parseImageAssetId(assetId);
    return `${parsed.assetId}-${parsed.width}x${parsed.height}.${parsed.extension}`;
  } catch {
    return null;
  }
}

/**
 * Calculates the crop box in pixel coordinates (rect=left,top,width,height)
 * based on the source crop fractions and intrinsic image dimensions.
 */
export function calculateCropRect(
  crop?: SanityImageCrop | null,
  dimensions?: ImageDimensions
): string | null {
  if (!crop || !dimensions) return null;

  const left = Math.round((crop.left ?? 0) * dimensions.width);
  const top = Math.round((crop.top ?? 0) * dimensions.height);
  const width = Math.round((1 - (crop.left ?? 0) - (crop.right ?? 0)) * dimensions.width);
  const height = Math.round((1 - (crop.top ?? 0) - (crop.bottom ?? 0)) * dimensions.height);

  return `${left},${top},${width},${height}`;
}

export interface FocalPoint {
  x: number;
  y: number;
}

/**
 * Converts the source hotspot (fractions of the full image) into a focal point
 * relative to the cropped area, clamped to 0–1 and rounded to 3 decimals.
 */
export function calculateFocalPoint(
  hotspot?: SanityImageHotspot | null,
  crop?: SanityImageCrop | null
): FocalPoint | null {
  if (hotspot?.x === undefined || hotspot?.y === undefined) return null;

  const left = crop?.left ?? 0;
  const top = crop?.top ?? 0;
  const cropWidth = 1 - left - (crop?.right ?? 0);
  const cropHeight = 1 - top - (crop?.bottom ?? 0);
  if (cropWidth <= 0 || cropHeight <= 0) return null;

  const normalize = (value: number) =>
    Math.round(Math.min(1, Math.max(0, value)) * 1000) / 1000;

  return {
    x: normalize((hotspot.x - left) / cropWidth),
    y: normalize((hotspot.y - top) / cropHeight),
  };
}

/**
 * Builds the URL search parameters for image transformations.
 */
export function buildImageQueryParams(
  options: ImageTransformOptions,
  cropRect?: string | null,
  focalPoint?: FocalPoint | null
): URLSearchParams {
  const searchParams = new URLSearchParams();
  searchParams.set("auto", "format");

  if (cropRect) {
    searchParams.set("rect", cropRect);
  }

  if (options.square) {
    const size = options.width || options.height || 500;
    searchParams.set("w", size.toString());
    searchParams.set("h", size.toString());
    searchParams.set("fit", "crop");

    // Center the square crop on the hotspot instead of the image center
    if (focalPoint) {
      searchParams.set("crop", "focalpoint");
      searchParams.set("fp-x", focalPoint.x.toString());
      searchParams.set("fp-y", focalPoint.y.toString());
    }
  } else {
    if (options.width) searchParams.set("w", options.width.toString());
    if (options.height) searchParams.set("h", options.height.toString());
    if (options.quality) searchParams.set("q", options.quality.toString());
  }

  return searchParams;
}
