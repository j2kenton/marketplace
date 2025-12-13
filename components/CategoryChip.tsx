import COLORS from "@/constants/Colors";
import { FontSize } from "@/constants/Text";
import { Pressable, Text } from "react-native";
import styled from "styled-components/native";

interface ChipPressableProps {
  $isSelected: boolean;
}

const ChipPressable = styled(Pressable)<ChipPressableProps>`
  background-color: ${({ $isSelected }: ChipPressableProps) =>
    $isSelected ? COLORS.tint : COLORS.gray200};
  border-radius: 16px;
  padding: 8px 14px;
  margin-right: 8px;
`;

interface ChipLabelProps {
  $isSelected: boolean;
}

const ChipLabel = styled(Text)<ChipLabelProps>`
  color: ${({ $isSelected }: ChipLabelProps) =>
    $isSelected ? COLORS.background : COLORS.text};
  font-size: ${FontSize.SIZE_14};
  font-weight: ${({ $isSelected }: ChipLabelProps) =>
    $isSelected ? "600" : "400"};
`;

interface CategoryChipProps {
  id: string | null;
  name: string;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
}

const CategoryChip = (props: CategoryChipProps) => {
  const { id, name, isSelected, onSelect } = props;

  return (
    <ChipPressable onPress={() => onSelect(id)} $isSelected={isSelected}>
      <ChipLabel $isSelected={isSelected}>{name}</ChipLabel>
    </ChipPressable>
  );
};

export default CategoryChip;
