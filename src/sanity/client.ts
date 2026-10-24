'use server'

import { type ClientConfig, createClient } from '@sanity/client'

const config: ClientConfig = {
  projectId: process.env.SANITY_API_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: process.env.SANITY_API_VERSION,
  requestTagPrefix: 'portfolio-frontend',
}

const client = createClient(config)

export interface FetchOptions {
  tags?: string[]
  revalidate?: number | false
}

/**
 * Server-only Sanity fetcher with tag-based caching.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: FetchOptions = {}
): Promise<T> {
  const { tags = [], revalidate } = options

  return client.fetch<T>(query, params, {
    next: {
      tags,
      revalidate,
    },
  })
}

/**
 * Backwards-compatible server fetch function.
 */
export async function fetchData(
  query: string,
  params: Record<string, unknown> = {},
  options: FetchOptions = {}
) {
  return sanityFetch(query, params, options)
}