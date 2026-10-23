'use server'

import {type ClientConfig, createClient} from '@sanity/client'

const config: ClientConfig = {
    projectId: process.env.SANITY_API_PROJECT_ID,
    dataset: process.env.SANITY_API_DATASET,
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: true,
    apiVersion: process.env.SANITY_API_VERSION,
    requestTagPrefix: 'frontend',
}

const client = createClient(config)


export async function fetchData(query: string, params = {}, options = {}) {
    return client.fetch(
        query,
        params,
        options,
    )
}