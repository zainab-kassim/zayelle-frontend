import { MetadataRoute } from 'next';

const BASE_URL = 'https://byzayelle.com';

async function getAllProductSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/products`, {
      next: { revalidate: 3600 }, // re-checked hourly, not on every crawl
    });
    if (!res.ok) return [];
    const { convertedProducts } = await res.json();
    return (convertedProducts ?? [])
      .map((product: { slug?: string }) => product.slug)
      .filter(Boolean);
  } catch {
    // sitemap generation shouldn't take the whole site down if the API is briefly unreachable
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProductSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/products`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/custom-order/book`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
