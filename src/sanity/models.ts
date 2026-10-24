import type {
  ABOUT_QUERY_RESULT,
  ALL_SKILLS_QUERY_RESULT,
  CONTACTS_QUERY_RESULT,
  JOBS_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  RESUME_QUERY_RESULT,
  SKILL_GROUPS_QUERY_RESULT,
} from './sanity.types'

// Re-export all underlying generated types
export * from './sanity.types'

/**
 * Human-readable domain models for React components and UI.
 */
export type About = NonNullable<ABOUT_QUERY_RESULT>
export type Job = JOBS_QUERY_RESULT[number]
export type Project = PROJECTS_QUERY_RESULT[number]
export type SkillGroup = SKILL_GROUPS_QUERY_RESULT[number]
export type Skill = ALL_SKILLS_QUERY_RESULT[number]
export type Contact = CONTACTS_QUERY_RESULT[number]
export type Resume = NonNullable<RESUME_QUERY_RESULT>

/**
 * Nested sub-models for compound fields.
 */
export type ProjectSkill = NonNullable<NonNullable<Project['skills']>[number]>
export type ProjectLink = NonNullable<NonNullable<Project['links']>[number]>
export type ProjectImage = NonNullable<NonNullable<Project['images']>[number]>
export type JobImage = NonNullable<NonNullable<Job['images']>[number]>
export type CompanyWebsite = Job['website']
