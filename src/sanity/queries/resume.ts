import { defineQuery } from 'groq'

export const RESUME_QUERY = defineQuery(`
  *[_type == "resume"][0] {
    _id,
    _type,
    lastUpdated,
    "pdfUrl": pdf.asset->url,
    "pdfSize": pdf.asset->size
  }
`)
