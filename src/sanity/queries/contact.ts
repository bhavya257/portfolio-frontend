import { defineQuery } from 'groq'
import { IMAGE_FIELDS } from './image'

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
        ${IMAGE_FIELDS}
      }
    }
  }
`)
