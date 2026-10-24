import { defineQuery } from 'groq'

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
    },
    startDate,
    endDate,
    customEndDate,
    description,
    images[] {
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
`)
