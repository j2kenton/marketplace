import { products } from "@/services/mockData";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./index";

/* START: Products selectors (simple state access) */
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) =>
  state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectHasMore = (state: RootState) => state.products.hasMore;
export const selectFilters = (state: RootState) => state.products.filters;
/* END: Products selectors (simple state access) */

/* START: Cart selectors (simple plus memoized) */

// Simple selector - returns raw cart items
export const selectCartItems = (state: RootState) => state.cart.items;

// Memoized selector - computes total item count
export const selectCartItemCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

// Memoized selector - joins cart items with product data
export const selectCartWithProducts = createSelector(
  selectCartItems,
  (cartItems) =>
    cartItems
      .map((item) => ({
        ...item,
        // TODO: move to key-value data structure for `products` to allow fast lookup and caching
        product: products.find((p) => p.id === item.productId),
      }))
      .filter((item) => item.product) // Filter out items where product wasn't found
);

// Memoized selector - computes cart total price
export const selectCartTotal = createSelector(selectCartWithProducts, (items) =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
);

/* END: Cart selectors */
