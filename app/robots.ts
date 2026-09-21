import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // private/transactional pages — no SEO value, and shouldn't be indexed
      // (checkout/cart/orders can carry a signed-in customer's own data)
      disallow: ['/checkout', '/cart', '/orders', '/auth'],
    },
    sitemap: 'https://byzayelle.com/sitemap.xml',
  };
}
