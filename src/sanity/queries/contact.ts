import { defineQuery } from 'groq'

export const CONTACTS_QUERY = defineQuery(`
  *[_type == "contact"] | order(title asc) {
    _id,
    _type,
    title,
    website {
      title,
      url,
      imageType,
      iconName,
      logo {
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
      }
    }
  }
`)
