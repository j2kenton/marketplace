import { Pressable, Text, View } from "react-native";

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 99;
const MINUS = "-";
const PLUS = "+";

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
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <View>
      <Pressable onPress={handleDecrease}>
        <Text>{MINUS}</Text>
      </Pressable>
      <Text>{value}</Text>
      <Pressable onPress={handleIncrease}>
        <Text>{PLUS}</Text>
      </Pressable>
    </View>
  );
};

export default QuantitySelector;
