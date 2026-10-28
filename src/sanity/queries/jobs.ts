import { defineQuery } from 'groq'
import { IMAGE_FIELDS } from './image'

export const JOBS_QUERY = defineQuery(`
  *[_type == "job"] | order(startDate desc) {
    _id,
    _type,
    title,
    company,
    website {
      title,
      url,
      imageType,
      iconName,
      logo {
        ${IMAGE_FIELDS}
      }
    },
    startDate,
    endDate,
    customEndDate,
    description,
    images[] {
      ${IMAGE_FIELDS}
    }
  }
`)

export const JOBS_PREVIEW_QUERY = defineQuery(`
  *[_type == "job"] | order(startDate desc)[0...2] {
    _id,
    _type,
    title,
    company,
    website {
      title,
      url
    },
    startDate,
    endDate,
    customEndDate,
    description
  }
`)

