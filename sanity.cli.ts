import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_API_PROJECT_ID,
    dataset: process.env.SANITY_API_DATASET,
  },
  typegen: {
    path: './src/**/*.{ts,tsx}',
    schema: process.env.SANITY_SCHEMA_PATH,
    generates: './src/sanity/sanity.types.ts',
  },
})
