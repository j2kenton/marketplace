import { Category } from "@/types";
import { Pressable, ScrollView, Text } from "react-native";

interface CategoryFilterProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedId,
  onSelect,
}: CategoryFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Pressable onPress={() => onSelect(null)}>
        <Text>{selectedId === null ? "[All]" : "All"}</Text>
      </Pressable>
      {categories.map((cat) => (
        <Pressable key={cat.id} onPress={() => onSelect(cat.id)}>
          <Text>{selectedId === cat.id ? `[${cat.name}]` : cat.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
