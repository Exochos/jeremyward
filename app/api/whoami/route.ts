/**
 * Echoes back what the server can see about the request that called it: IP, headers,
 * and any geo headers the host adds. Only ever returns the caller's own data.
 */
export const dynamic = "force-dynamic";

// Headers worth showing. Anything else (cookies, auth) is left out on purpose.
const SHOWN_HEADERS = [
  "user-agent",
  "accept-language",
  "referer",
  "dnt",
  "sec-gpc",
  "sec-ch-ua",
  "sec-ch-ua-mobile",
  "sec-ch-ua-platform",
];

export function GET(req: Request) {
  const h = req.headers;
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? undefined;

  const headers = Object.fromEntries(
    SHOWN_HEADERS.flatMap((name) => {
      const value = h.get(name);
      return value ? [[name, value]] : [];
    }),
  );

  const geo = {
    country: h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? undefined,
    region: h.get("x-vercel-ip-country-region") ?? undefined,
    city: h.get("x-vercel-ip-city") ? decodeURIComponent(h.get("x-vercel-ip-city")!) : undefined,
  };

  // no-store: a cached copy would show one visitor's IP to the next.
  return Response.json({ ip, headers, geo }, { headers: { "cache-control": "private, no-store" } });
}
