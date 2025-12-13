import { Category, SortKey, SortOption } from "@/types";
import { View } from "react-native";
import styled from "styled-components/native";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import SortFilter from "./SortFilter";

const StyledSearchBar = styled(SearchBar)`
  margin-bottom: 6px;
`;

interface ProductListHeaderProps {
  searchValue: string;
  onSearchChange: (text: string) => void;
  categories: Category[];
  selectedCategoryId: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  sortBy: SortOption;
  onSortToggle: (sortKey: SortKey) => void;
}

const ProductListHeader = (props: ProductListHeaderProps) => {
  const {
    searchValue,
    onSearchChange,
    categories,
    selectedCategoryId,
    onCategorySelect,
    sortBy,
    onSortToggle,
  } = props;

  return (
    <View>
      <StyledSearchBar value={searchValue} onChangeText={onSearchChange} />
      <CategoryFilter
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={onCategorySelect}
      />
      <SortFilter sortBy={sortBy} onToggle={onSortToggle} />
    </View>
  );
};

export default ProductListHeader;
