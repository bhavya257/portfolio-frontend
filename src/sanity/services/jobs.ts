'use server'

import { sanityFetch } from '../client'
import type { Job } from '../models'
import { JOBS_QUERY } from '../queries/jobs'

/**
 * Fetches all jobs/experience entries on the server.
 */
export async function getJobs(): Promise<Job[]> {
  const jobs = await sanityFetch<Job[] | null>(JOBS_QUERY, {}, { tags: ['job'] })
  return jobs || []
}
