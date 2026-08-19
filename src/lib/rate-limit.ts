type Entry = { count: number; resetAt: number; inFlight: number };
const entries = new Map<string, Entry>();

// Process-local protection for one Node instance. Use Redis/Upstash before horizontally scaling.
export function takeRateLimit(key: string, limit: number, windowMs: number, maxConcurrent = 1) {
  const now = Date.now();
  const previous = entries.get(key);
  const entry = !previous || previous.resetAt <= now ? { count: 0, resetAt: now + windowMs, inFlight: 0 } : previous;
  if (entry.count >= limit || entry.inFlight >= maxConcurrent) {
    entries.set(key, entry);
    return { allowed: false as const, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }
  entry.count++;
  entry.inFlight++;
  entries.set(key, entry);
  return { allowed: true as const, release: () => { const active = entries.get(key); if (active) active.inFlight = Math.max(0, active.inFlight - 1); } };
}
