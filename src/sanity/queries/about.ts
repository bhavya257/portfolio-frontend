import { defineQuery } from 'groq'

export const ABOUT_QUERY = defineQuery(`
  *[_type == "about"][0] {
    _id,
    _type,
    image {
      alt,
      crop,
      hotspot,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    description,
    "plainText": pt::text(description)
  }
`)
