import COLORS from "@/constants/Colors";
import STRINGS from "@/constants/Strings";
import { TextInput } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChangeText,
  placeholder = STRINGS.searchPlaceholder,
}: SearchBarProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.placeholderTextColor}
    />
  );
};

export default SearchBar;
