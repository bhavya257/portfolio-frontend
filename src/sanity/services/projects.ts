'use server'

import { sanityFetch } from '../client'
import type { Project } from '../models'
import { PROJECTS_QUERY } from '../queries/projects'

/**
 * Fetches all portfolio projects on the server.
 */
export async function getProjects(): Promise<Project[]> {
  const projects = await sanityFetch<Project[] | null>(PROJECTS_QUERY, {}, { tags: ['project'] })
  return projects || []
}
