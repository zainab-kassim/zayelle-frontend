export interface Product {
  id: number;
  image: string[];
  name: string;
  price: number; // API returns a number, not a string
  slug: string;
  size: string[];
  description: string;
  // shape varies by endpoint (sometimes only slug, sometimes only name, sometimes missing) — always guard with ?.
  collections?: {
    name?: string;
    slug?: string;
  };
}