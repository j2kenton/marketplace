import { Product, ProductFilters, SortOption } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductsState {
  items: Product[];
  // TODO: CONVERT TO LOADING STATUS ENUM
  // e.g. error, idle, loading, succeeded
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean; // TODO: REVIEW / RECONSIDER
  filters: ProductFilters; // TODO: consider renaming to 'QueryModifiers'
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  page: 1, // TODO: EXTRACT MAGIC NUMBER
  hasMore: true,
  filters: {
    search: "",
    categoryId: null,
    sortBy: "rating_desc", // TODO: MOVE TO ENUM
  },
};

const productsSlice = createSlice({
  name: "products", // TODO: EXTRACT TO CONSTANT
  initialState,
  reducers: {
    // Saga will listen for this action
    fetchProductsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    // Called by saga on success
    fetchProductsSuccess(
      state,
      action: PayloadAction<{ products: Product[]; hasMore: boolean }>
    ) {
      state.loading = false;
      // If page 1, replace items; otherwise append
      state.items =
        state.page === 1 // TODO: EXTRACT MAGIC NUMBER
          ? action.payload.products
          : [...state.items, ...action.payload.products];
      state.hasMore = action.payload.hasMore;
    },
    // Called by saga on failure
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
      state.page = 1; // TODO: EXTRACT MAGIC NUMBER
      state.items = [];
      state.loading = true;
      state.error = null;
    },
    setCategoryFilter(state, action: PayloadAction<string | null>) {
      state.filters.categoryId = action.payload;
      state.page = 1; // TODO: EXTRACT MAGIC NUMBER
      state.items = [];
      state.loading = true;
      state.error = null;
    },
    setSortBy(state, action: PayloadAction<SortOption>) {
      state.filters.sortBy = action.payload;
      state.page = 1; // TODO: EXTRACT MAGIC NUMBER
      state.items = [];
      state.loading = true;
      state.error = null;
    },
    loadMore(state) {
      state.page += 1; // TODO: EXTRACT MAGIC NUMBER
      state.loading = true;
      state.error = null;
    },
    // Reset everything
    resetFilters(state) {
      state.filters = initialState.filters;
      state.page = 1; // TODO: EXTRACT MAGIC NUMBER
      state.items = [];
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSearch,
  setCategoryFilter,
  setSortBy,
  loadMore,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
