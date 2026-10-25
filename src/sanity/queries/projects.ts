import { defineQuery } from 'groq'

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
    links[] {
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

