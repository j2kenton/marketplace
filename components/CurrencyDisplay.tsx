import { formatPrice } from "@/utils/Text";
import { memo } from "react";
import { Text, TextProps } from "react-native";

interface CurrencyDisplayProps extends TextProps {
  value: number;
}

const CurrencyDisplay = (props: CurrencyDisplayProps) => {
  const { value, style, ...textProps } = props;

  return (
    <Text {...textProps} style={style}>
      {formatPrice(value)}
    </Text>
  );
};

export default memo(CurrencyDisplay);
