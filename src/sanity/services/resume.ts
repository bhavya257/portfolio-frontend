'use server'

import { sanityFetch } from '../client'
import type { Resume } from '../models'
import { RESUME_QUERY } from '../queries/resume'

/**
 * Fetches the resume metadata on the server.
 */
export async function getResume(): Promise<Resume | null> {
  return sanityFetch<Resume | null>(RESUME_QUERY, {}, { tags: ['resume'] })
}
