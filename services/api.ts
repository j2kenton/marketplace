import STRINGS from "@/constants/Strings";
import {
  Category,
  Product,
  ProductFilters,
  SortDirection,
  SortKey,
} from "@/types";
import { categories, products } from "./mockData";

// Simulates network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ITEMS_PER_PAGE = 10;

export const api = {
  // Fetches paginated, filtered, and sorted products
  async getProducts(
    page: number,
    filters: ProductFilters
  ): Promise<{
    products: Product[];
    hasMore: boolean;
  }> {
    await delay(500); // Simulate 500ms network latency

    let filtered = [...products];

    // Search filter - matches name or description
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      );
    }

    // Category filter
    if (filters.categoryId) {
      filtered = filtered.filter((p) => p.category.id === filters.categoryId);
    }

    // Sorting
    const [sortKey, sortDirection] = filters.sortBy.split("_") as [
      SortKey,
      SortDirection
    ];

    const sortAccessors: Record<SortKey, (product: Product) => number> = {
      price: (product) => product.price,
      rating: (product) => product.rating,
      reviews: (product) => product.reviewCount,
    };

    const accessor = sortAccessors[sortKey];
    if (accessor) {
      filtered.sort((a, b) => {
        const difference = accessor(a) - accessor(b);
        return sortDirection === "asc" ? difference : -difference;
      });
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Pagination - slice the results
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginated = filtered.slice(start, end);

    return {
      products: paginated,
      hasMore: end < filtered.length, // Are there more pages?
    };
  },

  // Fetches a single product by ID
  async getProduct(id: string): Promise<Product | null> {
    await delay(300);
    return products.find((p) => p.id === id) || null;
  },

  // Fetches all categories
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return categories;
  },

  // Places an order (mock)
  async placeOrder(
    items: { productId: string; quantity: number }[]
  ): Promise<{ orderId: string }> {
    await delay(800);
    // Simulate 10% failure rate for realism
    if (Math.random() < 0.1) {
      throw new Error(STRINGS.orderFailed);
    }
    return { orderId: `order-${Date.now()}` };
  },
};
