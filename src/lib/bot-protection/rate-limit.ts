import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Isolate-local sliding counters. Generous enough that real visitors (and
 * Next.js prefetch) never notice; tight enough to blunt spam and click farms.
 */

type Limit = {
  burst: number;
  burstMs: number;
  minute: number;
};

const PAGE_HUMAN: Limit = { burst: 80, burstMs: 10_000, minute: 240 };
const PAGE_BOT: Limit = { burst: 16, burstMs: 10_000, minute: 36 };
const API_HUMAN: Limit = { burst: 24, burstMs: 10_000, minute: 60 };
const API_BOT: Limit = { burst: 8, burstMs: 10_000, minute: 18 };

const SEARCH_CRAWLER_RE =
  /googlebot|google-inspectiontool|adsbot-google|mediapartners-google|storebot-google|googleother|bingbot|bingpreview|slurp|duckduckbot|baiduspider|yandex(?:bot|images|mobilebot)?|facebookexternalhit|facebot|twitterbot|linkedinbot|applebot|semrushbot|ahrefsbot|dotbot|mj12bot|petalbot|ia_archiver|pinterestbot|whatsapp|telegrambot/i;

const SCRIPT_UA_RE =
  /(?:^| )(?:curl|wget|python-requests|python-urllib|scrapy|httpclient|libwww-perl|go-http-client|java\/|okhttp|postmanruntime|insomnia|axios\/|node-fetch|httpie)/i;

const SKIP_RATE_LIMIT_RE =
  /^\/(og|ads\.txt|robots\.txt|sitemap\.xml|manifest\.webmanifest|manifest\.json|icon|apple-icon)(\/|$)/;

type ClientKind = "crawler" | "bot" | "human";

type Bucket = {
  burstCount: number;
  burstResetAt: number;
  minuteCount: number;
  minuteResetAt: number;
};

const buckets = new Map<string, Bucket>();
let ops = 0;

function clientIp(request: NextRequest): string {
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;

  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;

  const vercel = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercel) return vercel;

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;

  return "unknown";
}

function classifyClient(request: NextRequest): ClientKind {
  const ua = request.headers.get("user-agent")?.trim() ?? "";
  if (ua && SEARCH_CRAWLER_RE.test(ua)) return "crawler";
  if (!ua || SCRIPT_UA_RE.test(ua)) return "bot";
  return "human";
}

function limitsFor(kind: Exclude<ClientKind, "crawler">, isApi: boolean): Limit {
  if (isApi) return kind === "bot" ? API_BOT : API_HUMAN;
  return kind === "bot" ? PAGE_BOT : PAGE_HUMAN;
}

function prune(now: number) {
  ops += 1;
  if (ops % 250 !== 0) return;

  if (buckets.size > 8_000) {
    buckets.clear();
    return;
  }

  for (const [key, bucket] of buckets) {
    if (bucket.burstResetAt <= now && bucket.minuteResetAt <= now) {
      buckets.delete(key);
    }
  }
}

function hit(key: string, limit: Limit, now: number): { limited: boolean; retryAfterSec: number } {
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = {
      burstCount: 0,
      burstResetAt: now + limit.burstMs,
      minuteCount: 0,
      minuteResetAt: now + 60_000,
    };
    buckets.set(key, bucket);
  }

  if (bucket.burstResetAt <= now) {
    bucket.burstCount = 0;
    bucket.burstResetAt = now + limit.burstMs;
  }
  if (bucket.minuteResetAt <= now) {
    bucket.minuteCount = 0;
    bucket.minuteResetAt = now + 60_000;
  }

  bucket.burstCount += 1;
  bucket.minuteCount += 1;

  const burstLimited = bucket.burstCount > limit.burst;
  const minuteLimited = bucket.minuteCount > limit.minute;
  if (!burstLimited && !minuteLimited) {
    return { limited: false, retryAfterSec: 0 };
  }

  const retryMs = Math.max(
    burstLimited ? bucket.burstResetAt - now : 0,
    minuteLimited ? bucket.minuteResetAt - now : 0,
  );
  return { limited: true, retryAfterSec: Math.max(1, Math.ceil(retryMs / 1000)) };
}

export function applyRateLimit(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  if (SKIP_RATE_LIMIT_RE.test(pathname)) return null;
  if (request.method === "OPTIONS" || request.method === "HEAD") return null;

  const kind = classifyClient(request);
  if (kind === "crawler") return null;

  const isApi = pathname.startsWith("/api/");
  const ip = clientIp(request);
  const limit = limitsFor(kind, isApi);
  const now = Date.now();
  prune(now);

  const { limited, retryAfterSec } = hit(`${kind}:${isApi ? "api" : "page"}:${ip}`, limit, now);
  if (!limited) return null;

  const retry = String(retryAfterSec);
  if (isApi) {
    return NextResponse.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": retry,
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return new NextResponse(null, {
    status: 429,
    headers: {
      "Retry-After": retry,
      "Cache-Control": "no-store",
    },
  });
}
