import STRINGS from "@/constants/Strings";
import { api } from "@/services/api";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../index";
import {
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  loadMore,
  setCategoryFilter,
  setSearch,
  setSortBy,
} from "../slices/productsSlice";

function* fetchProductsSaga() {
  try {
    // Get current state values
    const state: RootState = yield select();
    const { page, filters } = state.products;

    // Call the API (this is where the "side effect" happens)
    const result: Awaited<ReturnType<typeof api.getProducts>> = yield call(
      api.getProducts,
      page,
      filters
    );

    // Dispatch success action with the data
    yield put(fetchProductsSuccess(result));
  } catch (error) {
    yield put(
      fetchProductsFailure(
        error instanceof Error ? error.message : STRINGS.unknownError
      )
    );
  }
}

export default function* productsSaga() {
  // Listen for these actions and run fetchProductsSaga
  yield takeLatest(
    [
      fetchProductsRequest.type, // Explicit fetch
      setSearch.type, // Re-fetch when search changes
      setCategoryFilter.type, // Re-fetch when category changes
      setSortBy.type, // Re-fetch when sort changes
      loadMore.type, // Fetch next page
    ],
    fetchProductsSaga
  );
}
