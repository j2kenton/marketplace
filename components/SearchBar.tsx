import { TextInput, View } from "react-native";
import styled from "styled-components/native";

import COLORS from "@/constants/Colors";
import STRINGS from "@/constants/Strings";
import { FontSize } from "@/constants/Text";

const Container = styled(View)`
  background-color: ${COLORS.background};
  border-radius: 12px;
  padding: 0;
  margin: 12px 0;
`;

const Input = styled(TextInput)`
  font-size: ${FontSize.SIZE_16};
  padding: 8px;
  color: ${COLORS.text};
`;

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
    <Container>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholderTextColor}
      />
    </Container>
  );
};

export default SearchBar;
