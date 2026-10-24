import { defineQuery } from 'groq'

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
