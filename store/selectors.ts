import { products } from "@/services/mockData";
import { CartItem, Product, ProductFilters } from "@/types";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";

type CartItemWithProduct = CartItem & { product: Product };

/* START: Products selectors (simple state access) */
export const selectProducts = (state: RootState): Product[] =>
  state.products.items;
export const selectProductsLoading = (state: RootState): boolean =>
  state.products.loading;
export const selectProductsError = (state: RootState): string | null =>
  state.products.error;
export const selectHasMore = (state: RootState): boolean =>
  state.products.hasMore;
export const selectFilters = (state: RootState): ProductFilters =>
  state.products.filters;
/* END: Products selectors (simple state access) */

/* START: Cart selectors (simple plus memoized) */

// Simple selector - returns raw cart items
export const selectCartItems = (state: RootState): CartItem[] =>
  state.cart.items;

// Memoized selector - computes total item count
export const selectCartItemCount = createSelector(
  selectCartItems,
  (items: CartItem[]): number =>
    items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
);

// Memoized selector - joins cart items with product data
export const selectCartWithProducts = createSelector(
  selectCartItems,
  (cartItems: CartItem[]): CartItemWithProduct[] =>
    cartItems
      .map((item: CartItem) => {
        // TODO: move to key-value data structure for `products` to allow fast lookup and caching
        const product = products.find((p) => p.id === item.productId);
        return product ? { ...item, product } : null;
      })
      .filter((item): item is CartItemWithProduct => item !== null)
);

// Memoized selector - computes cart total price
export const selectCartTotal = createSelector(
  selectCartWithProducts,
  (items: CartItemWithProduct[]): number =>
    items.reduce(
      (sum: number, item: CartItemWithProduct) =>
        sum + item.product.price * item.quantity,
      0
    )
);

/* END: Cart selectors */
