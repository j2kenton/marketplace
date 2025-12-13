import STRINGS from "@/constants/Strings";
import { Category } from "@/types";
import { ScrollView } from "react-native";
import CategoryChip from "./CategoryChip";

interface CategoryFilterProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const CategoryFilter = (props: CategoryFilterProps) => {
  const { categories, selectedId, onSelect } = props;
  const isAllSelected = selectedId === null || selectedId === undefined;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <CategoryChip
        id={null}
        name={STRINGS.all}
        isSelected={isAllSelected}
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
