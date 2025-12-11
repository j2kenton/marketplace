import { Pressable, Text, View } from "react-native";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) => {
  return (
    <View>
      <Pressable onPress={() => onChange(Math.max(min, value - 1))}>
        <Text>−</Text>
      </Pressable>
      <Text>{value}</Text>
      <Pressable onPress={() => onChange(Math.min(max, value + 1))}>
        <Text>+</Text>
      </Pressable>
    </View>
  );
};

export default QuantitySelector;
