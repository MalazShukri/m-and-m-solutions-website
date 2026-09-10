// In-memory sliding-window rate limiter. Fine for a single-instance deploy;
// on a multi-instance/serverless platform each instance has its own memory,
// so treat this as a basic abuse deterrent, not a hard guarantee.
const hits = new Map<string, number[]>()

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

export function isRateLimited(key: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps)
    return true
  }

  timestamps.push(now)
  hits.set(key, timestamps)

  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
    }
  }

  return false
}
