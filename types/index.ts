export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number; // e.g. up to 5 stars
  reviewCount: number;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type SortDirection = "asc" | "desc";
export type SortKey = "price" | "rating" | "reviews";
export type SortOption = `${SortKey}_${SortDirection}`;
export type SortSelection = SortOption | null;

export interface ProductFilters {
  search: string;
  categoryId: string | null;
  sortBy: SortSelection;
}
