'use server'

import { sanityFetch } from '../client'
import type { About } from '../models'
import { ABOUT_QUERY } from '../queries/about'

/**
 * Fetches the About section data on the server.
 */
export async function getAbout(): Promise<About | null> {
  return sanityFetch<About | null>(ABOUT_QUERY, {}, { tags: ['about'] })
}
