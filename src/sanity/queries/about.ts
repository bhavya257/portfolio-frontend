import { defineQuery } from 'groq'
import { IMAGE_FIELDS } from './image'

export const ABOUT_QUERY = defineQuery(`
  *[_type == "about"][0] {
    _id,
    _type,
    image {
      ${IMAGE_FIELDS}
    },
    description,
    "plainText": pt::text(description)
  }
`)
