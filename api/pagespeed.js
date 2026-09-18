const ALLOWED_ORIGINS = new Set([
  "https://prftools.cloud",
  "https://www.prftools.cloud"
]);

const MAX_URL_LENGTH = 2048;
const CACHE_TTL_SECONDS = 300;

function corsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://prftools.cloud";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function json(data, status, origin, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...corsHeaders(origin),
      ...extraHeaders
    }
  });
}

function normalizeUrl(value) {
  if (!value || value.length > MAX_URL_LENGTH) return null;

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }

  if (!["http:", "https:"].includes(parsed.protocol)) return null;
  if (!parsed.hostname || parsed.username || parsed.password) return null;

  return parsed.toString();
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin)
      });
    }

    const url = new URL(request.url);

    if (url.pathname !== "/api/pagespeed") {
      return json({ error: "Not found" }, 404, origin);
    }

    if (request.method !== "GET") {
      return json({ error: "Method not allowed" }, 405, origin, {
        Allow: "GET, OPTIONS"
      });
    }

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return json({ error: "Origin not allowed" }, 403, origin);
    }

    const target = normalizeUrl(url.searchParams.get("url"));
    const strategy = url.searchParams.get("strategy") || "mobile";

    if (!target) {
      return json({ error: "A valid http(s) URL is required." }, 400, origin);
    }

    if (!["mobile", "desktop"].includes(strategy)) {
      return json({ error: "Strategy must be mobile or desktop." }, 400, origin);
    }

    if (!env.PAGESPEED_API_KEY) {
      return json({ error: "PageSpeed service is not configured." }, 503, origin);
    }

    const cache = caches.default;
    const cacheKey = new Request(
      `https://prftools.cloud/api/pagespeed?url=${encodeURIComponent(target)}&strategy=${strategy}`,
      { method: "GET" }
    );

    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const upstream = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    upstream.searchParams.set("url", target);
    upstream.searchParams.set("strategy", strategy);
    upstream.searchParams.set("key", env.PAGESPEED_API_KEY);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(upstream.toString(), {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "User-Agent": "prftools.cloud PageSpeed Proxy"
        },
        signal: controller.signal
      });

      const body = await response.text();
      const contentType = response.headers.get("Content-Type") || "application/json";

      if (!response.ok) {
        return new Response(body, {
          status: response.status,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "no-store",
            ...corsHeaders(origin)
          }
        });
      }

      const result = new Response(body, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
          ...corsHeaders(origin)
        }
      });

      ctx.waitUntil(cache.put(cacheKey, result.clone()));
      return result;
    } catch (error) {
      const message = error?.name === "AbortError"
        ? "PageSpeed request timed out."
        : "PageSpeed service is temporarily unavailable.";

      return json({ error: message }, 504, origin);
    } finally {
      clearTimeout(timeout);
    }
  }
};
