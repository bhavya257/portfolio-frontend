import { defineQuery } from 'groq'
import { IMAGE_FIELDS } from './image'

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(endDate desc, startDate desc) {
    _id,
    _type,
    title,
    startDate,
    endDate,
    summary,
    description,
    images[] {
      ${IMAGE_FIELDS}
    },
    links[] {
      title,
      url,
      imageType,
      iconName,
      logo {
        ${IMAGE_FIELDS}
      }
    },
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

export const PROJECTS_PREVIEW_QUERY = defineQuery(`
  *[_type == "project"] | order(endDate desc, startDate desc)[0...2] {
    _id,
    _type,
    title,
    startDate,
    endDate,
    summary,
    description,
    images[] {
      ${IMAGE_FIELDS}
    },
    links[] {
      title,
      url,
      imageType,
      iconName
    },
    skills[]-> {
      _id,
      _type,
      name
    }
  }
`)

