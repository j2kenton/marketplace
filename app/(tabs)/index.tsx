import ErrorState from "@/components/ErrorState";
import ListEmpty from "@/components/ListEmpty";
import ListFooter from "@/components/ListFooter";
import ProductCard from "@/components/ProductCard";
import ProductListHeader from "@/components/ProductListHeader";
import { categories } from "@/services/mockData";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectFilters,
  selectHasMore,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "@/store/selectors";
import {
  fetchProductsRequest,
  loadMore,
  setCategoryFilter,
  setSearch,
} from "@/store/slices/productsSlice";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

const NUM_COLUMNS = 1;

const StyledFlatList: typeof FlatList = styled(FlatList)`
  flex: 1;
  padding: 0 16px;
`;

export default function ProductListScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const hasMore = useAppSelector(selectHasMore);
  const filters = useAppSelector(selectFilters);

  const { search, categoryId } = filters;

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleSearch = (text: string) => {
    dispatch(setSearch(text));
  };

  const handleCategorySelect = (categoryId: string | null) => {
    dispatch(setCategoryFilter(categoryId));
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(loadMore());
    }
  };

  const handleProductPress = (productId: string) => {
    // TODO: extract string
    router.push({ pathname: "/product/[id]", params: { id: productId } });
  };

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={() => dispatch(fetchProductsRequest())}
      />
    );
  }

  return (
    <StyledFlatList
      contentContainerStyle={{ gap: 12, flexGrow: 1 }}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => handleProductPress(item.id)}
        />
      )}
      ListHeaderComponent={
        <ProductListHeader
          searchValue={search}
          onSearchChange={handleSearch}
          categories={categories}
          selectedCategoryId={categoryId}
          onCategorySelect={handleCategorySelect}
        />
      }
      ListEmptyComponent={<ListEmpty loading={loading} />}
      ListFooterComponent={
        <ListFooter
          loading={loading}
          hasMore={hasMore}
          isEmpty={products.length === 0}
          onLoadMore={handleLoadMore}
        />
      }
      numColumns={NUM_COLUMNS}
    />
  );
}
