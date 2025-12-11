import STRINGS from "@/constants/Strings";
import { Category } from "@/types";
import { ScrollView } from "react-native";
import CategoryChip from "./CategoryChip";

// TODO: handle edge case where a real category id is "view_all_categories"
const VIEW_ALL_CATEGORIES = "view_all_categories";

interface CategoryFilterProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const CategoryFilter = (props: CategoryFilterProps) => {
  const { categories, selectedId, onSelect } = props;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <CategoryChip
        id={VIEW_ALL_CATEGORIES}
        name={STRINGS.all}
        isSelected={selectedId === VIEW_ALL_CATEGORIES}
        onSelect={onSelect}
      />
      {categories.map(({ id, name }) => (
        <CategoryChip
          key={id}
          id={id}
          name={name}
          isSelected={id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryFilter;
