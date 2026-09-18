/**
 * Optional production site URL for canonical/sitemap output.
 * Leave unset for local development. Set to a valid https URL
 * (not localhost) when publishing, e.g. https://example.com
 */
export function getSiteUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    if (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname.endsWith(".local")
    ) {
      return undefined;
    }
    return url.origin;
  } catch {
    return undefined;
  }
}
