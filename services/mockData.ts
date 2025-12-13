import { Category, Product } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Home & Garden" },
  { id: "4", name: "Sports" },
  { id: "5", name: "Books" },
];

// Product images by category (using Unsplash source for relevant images)
const productImages: Record<string, string[]> = {
  "1": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1619953942547-233eab5a70d6?w=400&h=400&fit=crop",
  ],
  "2": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
  ],
  "3": [
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  ],
  "4": [
    "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=400&fit=crop",
  ],
  "5": [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=400&fit=crop",
  ],
};

// Product names by category
const productNames: Record<string, string[]> = {
  "1": [
    "Wireless Bluetooth Headphones",
    '4K Ultra HD Smart TV 55"',
    "Portable Power Bank 20000mAh",
    "Mechanical Gaming Keyboard",
    "Smartphone Fast Charger",
    "Noise Cancelling Earbuds",
    "USB-C Hub Adapter",
    "Wireless Mouse",
    "Smart Watch Fitness Tracker",
    "Laptop Stand Adjustable",
  ],
  "2": [
    "Premium Cotton T-Shirt",
    "Slim Fit Denim Jeans",
    "Cozy Winter Hoodie",
    "Running Athletic Shorts",
    "Classic Leather Belt",
    "Wool Blend Sweater",
    "Casual Linen Shirt",
    "Waterproof Rain Jacket",
    "Comfortable Sneakers",
    "Summer Floral Dress",
  ],
  "3": [
    "Ceramic Plant Pot Set",
    "LED String Lights",
    "Memory Foam Pillow",
    "Stainless Steel Cookware Set",
    "Bamboo Cutting Board",
    "Scented Candle Collection",
    "Wall Art Canvas Print",
    "Soft Throw Blanket",
    "Garden Tool Kit",
    "Smart Home Thermostat",
  ],
  "4": [
    "Yoga Mat Non-Slip",
    "Resistance Bands Set",
    "Adjustable Dumbbells",
    "Running Shoes Lightweight",
    "Sports Water Bottle",
    "Fitness Jump Rope",
    "Cycling Helmet",
    "Tennis Racket Pro",
    "Swimming Goggles",
    "Basketball Official Size",
  ],
  "5": [
    "The Art of Programming",
    "Mindfulness for Beginners",
    "Cooking Made Simple",
    "World History Encyclopedia",
    "Science Fiction Anthology",
    "Business Strategy Guide",
    "Photography Masterclass",
    "Poetry Collection",
    "Self-Improvement Handbook",
    "Travel Adventures Journal",
  ],
};

// Generate 50 products with realistic names
export const products: Product[] = Array.from({ length: 50 }, (_, i) => {
  const category = categories[i % categories.length];
  const categoryNames = productNames[category.id];
  const nameIndex = Math.floor(i / categories.length) % categoryNames.length;

  return {
    id: `product-${i + 1}`,
    name: categoryNames[nameIndex],
    description: `High-quality ${categoryNames[
      nameIndex
    ].toLowerCase()} with premium materials and excellent craftsmanship.`,
    price: Math.floor(Math.random() * 200) + 10,
    category,
    image: productImages[category.id][nameIndex],
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 500),
    stock: Math.floor(Math.random() * 100),
  };
});

// Pick the last product in each category to feature
export const getOneProductPerCategory = (): Product[] => {
  return categories.map((category) => {
    const product = [...products]
      .reverse()
      .find((p) => p.category.id === category.id);
    return product!;
  });
};
