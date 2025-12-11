import { Category } from "@/types";
import { View } from "react-native";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";

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
      <SearchBar value={searchValue} onChangeText={onSearchChange} />
      <CategoryFilter
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={onCategorySelect}
      />
    </View>
  );
};

export default ProductListHeader;
