// Downloads the Sanity schema published by the portfolio-cms repo (see its
// .github/workflows/publish-schema.yml) so `sanity typegen generate` can run
// without the CMS source. Fails the build if the schema cannot be fetched.
import { writeFile } from "node:fs/promises";

const SCHEMA_URL =
  "https://raw.githubusercontent.com/bhavya257/portfolio-cms/main/schema.json";
const OUTPUT_PATH = "schema.json";

const res = await fetch(SCHEMA_URL);
if (!res.ok) {
  console.error(`Failed to download Sanity schema: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const body = await res.text();
if (!Array.isArray(JSON.parse(body))) {
  console.error("Downloaded Sanity schema is not a JSON array of schema types");
  process.exit(1);
}

await writeFile(OUTPUT_PATH, body);
console.log(`Sanity schema saved to ${OUTPUT_PATH}`);
