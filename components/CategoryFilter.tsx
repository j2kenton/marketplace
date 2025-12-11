import { Category } from "@/types";
import { Pressable, ScrollView, Text } from "react-native";

interface CategoryFilterProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const CategoryFilter = (props: CategoryFilterProps) => {
  const { categories, selectedId, onSelect } = props;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Pressable onPress={() => onSelect(null)}>
        <Text>{selectedId === null ? "[All]" : "All"}</Text>
      </Pressable>
      {categories.map(({ id, name }) => (
        <Pressable key={id} onPress={() => onSelect(id)}>
          <Text>{selectedId === id ? `[${name}]` : name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default CategoryFilter;
