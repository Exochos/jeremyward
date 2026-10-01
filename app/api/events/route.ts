import type { AnalyticsEvent } from "@/lib/analytics";

/**
 * Receives analytics events from the browser. For now it writes one JSON line per
 * event to stdout, so any log shipper (Loki, CloudWatch, Vector...) can pick them up.
 * Swap this for a database or a hosted analytics provider later.
 */
export async function POST(req: Request) {
  const event = (await req.json().catch(() => null)) as AnalyticsEvent | null;
  if (!event || typeof event.name !== "string") {
    return new Response(null, { status: 400 });
  }

  console.log(
    JSON.stringify({
      type: "analytics",
      ...event,
      userAgent: req.headers.get("user-agent"),
      country: req.headers.get("x-vercel-ip-country") ?? req.headers.get("cf-ipcountry") ?? undefined,
    }),
  );

  return new Response(null, { status: 204 });
}
