import COLORS from "@/constants/Colors";
import STRINGS from "@/constants/Strings";
import { FontSize, FontWeight } from "@/constants/Text";
import { SortDirection, SortKey, SortOption } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled(View)`
  margin-top: 10px;
`;

const Label = styled(Text)`
  font-size: ${FontSize.SIZE_14};
  font-weight: ${FontWeight.SEMI_BOLD};
  margin-bottom: 6px;
`;

const ChipsRow = styled(ScrollView)`
  margin-bottom: 6px;
`;

const Chip = styled(Pressable)<{ $active: boolean }>`
  background-color: ${({ $active }: { $active: boolean }) =>
    $active ? COLORS.tint : COLORS.gray200};
  border-radius: 16px;
  padding: 8px 12px;
  margin-right: 8px;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const ChipLabel = styled(Text)<{ $active: boolean }>`
  color: ${({ $active }: { $active: boolean }) =>
    $active ? COLORS.background : COLORS.text};
  font-size: ${FontSize.SIZE_14};
  font-weight: ${({ $active }: { $active: boolean }) =>
    $active ? FontWeight.SEMI_BOLD : FontWeight.REGULAR};
`;

const SortIcon = styled(FontAwesome)<{ $active: boolean }>`
  color: ${({ $active }: { $active: boolean }) =>
    $active ? COLORS.background : COLORS.text};
`;

const options: { key: SortKey; label: string }[] = [
  { key: "rating", label: STRINGS.rating },
  { key: "price", label: STRINGS.price },
  { key: "reviews", label: STRINGS.reviews },
];

const parseSort = (
  sortBy: SortOption
): {
  key: SortKey;
  direction: SortDirection;
} => {
  const [key, direction] = sortBy.split("_") as [SortKey, SortDirection];
  return { key, direction };
};

interface SortFilterProps {
  sortBy: SortOption;
  onToggle: (key: SortKey) => void;
}

const SortFilter = ({ sortBy, onToggle }: SortFilterProps) => {
  const { key: activeKey, direction } = parseSort(sortBy);

  return (
    <Container>
      <Label>{STRINGS.sortBy}</Label>
      <ChipsRow horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option) => {
          const isActive = option.key === activeKey;
          const iconDirection: SortDirection = isActive ? direction : "desc";
          const iconName = iconDirection === "asc" ? "arrow-up" : "arrow-down";

          return (
            <Chip
              key={option.key}
              onPress={() => onToggle(option.key)}
              $active={isActive}
              accessibilityRole="button"
              accessibilityLabel={`${STRINGS.sortBy} ${option.label}`}
            >
              <SortIcon name={iconName} size={14} $active={isActive} />
              <ChipLabel $active={isActive}>{option.label}</ChipLabel>
            </Chip>
          );
        })}
      </ChipsRow>
    </Container>
  );
};

export default SortFilter;
