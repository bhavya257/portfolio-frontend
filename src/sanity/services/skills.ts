'use server'

import { sanityFetch } from '../client'
import type { Skill, SkillGroup } from '../models'
import { ALL_SKILLS_QUERY, SKILL_GROUPS_QUERY } from '../queries/skills'

/**
 * Fetches all skill groups along with their dereferenced skills on the server.
 */
export async function getSkillGroups(): Promise<SkillGroup[]> {
  const groups = await sanityFetch<SkillGroup[] | null>(
    SKILL_GROUPS_QUERY,
    {},
    { tags: ['skillGroup', 'skill'] }
  )
  return groups || []
}

/**
 * Fetches flat list of all skills on the server.
 */
export async function getAllSkills(): Promise<Skill[]> {
  const skills = await sanityFetch<Skill[] | null>(ALL_SKILLS_QUERY, {}, { tags: ['skill'] })
  return skills || []
}
