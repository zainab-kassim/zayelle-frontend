// the single-product endpoint returns collections.name but no slug,
// so derive it: "Floreal collection" -> "floreal-collection"
export function slugifyCollectionName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}
