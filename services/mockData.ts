import { Category, Product } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Home & Garden" },
  { id: "4", name: "Sports" },
  { id: "5", name: "Books" },
];

// Generate 50 products programmatically
export const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  description: `This is a great product #${i + 1} with amazing features.`,
  price: Math.floor(Math.random() * 200) + 10, // $10-$210
  category: categories[i % categories.length], // Cycles through categories
  image: `https://picsum.photos/seed/${i + 1}/400/400`, // Random placeholder images
  rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0-5.0 rating
  reviewCount: Math.floor(Math.random() * 500),
  stock: Math.floor(Math.random() * 100),
}));
