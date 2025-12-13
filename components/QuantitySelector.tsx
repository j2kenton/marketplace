import { MINUS, PLUS } from "@/constants/Chars";
import COLORS from "@/constants/Colors";
import { Pressable, Text, TextInput, View } from "react-native";
import styled from "styled-components/native";

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 99;
const DEFAULT_STEP = 1;

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const StepButton = styled(Pressable)`
  background-color: ${COLORS.gray300};
  border-radius: 4px;
  padding: 4px;
`;

const QuantityInput = styled(TextInput)`
  text-align: center;
  min-width: 24px;
  padding: 2px;
`;

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({
  value,
  onChange,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
}: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - DEFAULT_STEP);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + DEFAULT_STEP);
    }
  };

  const handleChangeText = (text: string) => {
    const num = parseInt(text, 10);
    if (!isNaN(num) && num >= min && num <= max) {
      onChange(num);
    }
  };

  return (
    <Container>
      <StepButton onPress={handleDecrease}>
        <Text>{MINUS}</Text>
      </StepButton>
      <QuantityInput
        value={String(value)}
        onChangeText={handleChangeText}
        keyboardType="numeric"
      />
      <StepButton onPress={handleIncrease}>
        <Text>{PLUS}</Text>
      </StepButton>
    </Container>
  );
};

export default QuantitySelector;
