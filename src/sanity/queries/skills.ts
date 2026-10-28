import { defineQuery } from 'groq'
import { IMAGE_FIELDS } from './image'

export const SKILL_GROUPS_QUERY = defineQuery(`
  *[_type == "skillGroup"] | order(title asc) {
    _id,
    _type,
    title,
    iconName,
    skills[]-> {
      _id,
      _type,
      name,
      documentation {
        title,
        url,
        imageType,
        iconName,
        logo {
          ${IMAGE_FIELDS}
        }
      }
    }
  }
`)

export const ALL_SKILLS_QUERY = defineQuery(`
  *[_type == "skill"] | order(name asc) {
    _id,
    _type,
    name,
    documentation {
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
