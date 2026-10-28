/**
 * Standard reusable image projection fragment for GROQ queries.
 * Omits raw Sanity CDN URLs to keep asset credentials secure on the server,
 * while extracting dimensions, LQIP, crop, and hotspot for layout stability and placeholders.
 */
export const IMAGE_FIELDS = `
  alt,
  crop,
  hotspot,
  asset-> {
    _id,
    metadata {
      dimensions,
      lqip
    }
  }
`;
