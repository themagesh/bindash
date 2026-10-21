import crypto from 'node:crypto';

export const SESSION_COOKIE = 'bindash_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Fallback password so the site is usable out of the box.
// Override it with SITE_PASSWORD in .env.local / Vercel env vars.
const DEFAULT_PASSWORD = 'Daven@12334';

export function getSitePassword() {
  return (process.env.SITE_PASSWORD || DEFAULT_PASSWORD).trim();
}

function getSecret() {
  return process.env.AUTH_SECRET || getSitePassword();
}

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function isValidPassword(candidate) {
  if (typeof candidate !== 'string') return false;
  // Trim so an accidental leading/trailing space (or a stray newline pasted
  // from a password manager) does not cause a false "Invalid password".
  const trimmed = candidate.trim();
  if (trimmed.length === 0) return false;
  return safeEqual(trimmed, getSitePassword());
}

function sign(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createSessionToken() {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;

  const separator = token.lastIndexOf('.');
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  if (!safeEqual(signature, sign(payload))) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}
