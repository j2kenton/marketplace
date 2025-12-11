import { Pressable, Text } from "react-native";

interface CategoryChipProps {
  id: string | null;
  name: string;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}

const CategoryChip = (props: CategoryChipProps) => {
  const { id, name, isSelected, onSelect } = props;
  const text = isSelected ? ["[", name, "]"].join("") : name;

  return (
    <Pressable onPress={() => onSelect(id)}>
      <Text>{text}</Text>
    </Pressable>
  );
};

export default CategoryChip;
