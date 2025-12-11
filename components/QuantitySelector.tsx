import { MINUS, PLUS } from "@/constants/Chars";
import { Pressable, Text, View } from "react-native";

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 99;
const DEFAULT_STEP = 1;

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
