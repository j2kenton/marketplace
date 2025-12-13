import { Category } from "@/types";
import { View } from "react-native";
import { styled } from "styled-components";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";

const StyledSearchBar = styled(SearchBar)`
  margin-bottom: 6px;
`;

interface ProductListHeaderProps {
  searchValue: string;
  onSearchChange: (text: string) => void;
  categories: Category[];
  selectedCategoryId: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

const ProductListHeader = (props: ProductListHeaderProps) => {
  const {
    searchValue,
    onSearchChange,
    categories,
    selectedCategoryId,
    onCategorySelect,
  } = props;

  return (
    <View>
      <StyledSearchBar value={searchValue} onChangeText={onSearchChange} />
      <CategoryFilter
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={onCategorySelect}
      />
    </View>
  );
};

export default ProductListHeader;
