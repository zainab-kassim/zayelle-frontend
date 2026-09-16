// The single-product endpoint (GET /products/:slug) returns
// `collections: { name }` only — no slug — unlike the collection-list
// endpoint. Collection slugs are consistently "<lowercased name, spaces as
// hyphens>" (e.g. "Floreal collection" -> "floreal-collection"), so this
// derives the link target instead of trusting a field the API doesn't send.
export function slugifyCollectionName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}
