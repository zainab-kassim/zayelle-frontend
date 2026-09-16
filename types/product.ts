export interface Product {
  id: number;
  image: string[];
  name: string;
  // The API returns this as a number; formatPrice() accepts either, but
  // the field itself is never actually a string.
  price: number;
  slug: string;
  size: string[];
  description: string;
  // Never returned consistently: getProducts() includes only `slug`,
  // getProductBySlug() includes only `name`, and getProductByCollection()
  // omits this field entirely. Always guard with optional chaining.
  collections?: {
    name?: string;
    slug?: string;
  };
}