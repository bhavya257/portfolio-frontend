'use server'

import { sanityFetch } from '../client'
import type { Contact } from '../models'
import { CONTACTS_QUERY } from '../queries/contact'

/**
 * Fetches all contact links on the server.
 */
export async function getContacts(): Promise<Contact[]> {
  const contacts = await sanityFetch<Contact[] | null>(CONTACTS_QUERY, {}, { tags: ['contact'] })
  return contacts || []
}
