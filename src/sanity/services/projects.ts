'use server'

import { sanityFetch } from '../client'
import type { Project } from '../models'
import { PROJECTS_QUERY, PROJECTS_PREVIEW_QUERY } from '../queries/projects'

/**
 * Fetches all portfolio projects on the server.
 */
export async function getProjects(): Promise<Project[]> {
  const projects = await sanityFetch<Project[] | null>(PROJECTS_QUERY, {}, { tags: ['project'] })
  return projects || []
}

/**
 * Fetches the top 2 recent projects for the home page preview.
 */
export async function getProjectsPreview(): Promise<Project[]> {
  const projects = await sanityFetch<Project[] | null>(
    PROJECTS_PREVIEW_QUERY,
    {},
    { tags: ['project'] }
  )
  return projects || []
}

