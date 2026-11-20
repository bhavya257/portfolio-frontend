import { NextRequest, NextResponse } from "next/server";

const projectId = process.env.SANITY_API_PROJECT_ID;
const dataset = process.env.SANITY_API_DATASET;

/**
 * Proxies Sanity image asset requests.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    if (!projectId || !dataset) {
      return new NextResponse("Sanity configuration missing", { status: 500 });
    }

    const { path } = await context.params;
    if (!path || path.length === 0) {
      return new NextResponse("Invalid image path", { status: 400 });
    }

    const filePath = path.join("/");
    const { search } = new URL(request.url);
    const sanityUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${filePath}${search}`;

    const res = await fetch(sanityUrl, {
      next: {
        tags: ["media", "media/image", filePath],
        revalidate: 31536000,
      },
    });

    if (!res.ok) {
      return new NextResponse("Image not found", { status: res.status });
    }

    const contentType = res.headers.get("content-type");

    return new NextResponse(res.body, {
      status: 200,
      headers: {
        ...(contentType ? { "Content-Type": contentType } : {}),
        // 1 year (365 days) immutable cache for hashed image assets
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error fetching image";
    return new NextResponse(message, { status: 500 });
  }
}
