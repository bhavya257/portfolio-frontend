'use server'

import { sanityFetch } from '../client'
import type { Job } from '../models'
import { JOBS_QUERY, JOBS_PREVIEW_QUERY } from '../queries/jobs'

/**
 * Fetches all jobs/experience entries on the server.
 */
export async function getJobs(): Promise<Job[]> {
  const jobs = await sanityFetch<Job[] | null>(JOBS_QUERY, {}, { tags: ['job'] })
  return jobs || []
}

/**
 * Fetches the top 2 recent jobs for the home page preview.
 */
export async function getJobsPreview(): Promise<Job[]> {
  const jobs = await sanityFetch<Job[] | null>(
    JOBS_PREVIEW_QUERY,
    {},
    { tags: ['job'] }
  )
  return jobs || []
}

